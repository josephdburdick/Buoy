class EventsController < ApplicationController

  def index
    @events = Event.order('start_time ASC').all
    @venues = Venue.all
    unless current_user.nil?
      @profile_picture = graph.get_picture("Me", :type => "large")
    end
  end

  def show
    find_event
    @venues          = find_event.venues
    @users           = User.all
    marker_image_url = ActionController::Base.helpers.asset_path("buoy-icon.png").to_s
    @hash            = Gmaps4rails.build_markers(@venues) do |venue, marker|
      marker.lat venue.latitude
      marker.lng venue.longitude
      marker.picture({
        :url => marker_image_url,
        :width => "32",
        :height => "32"
      })
      marker.infowindow "#{venue.name}<br>#{venue.street}"
    end
  end

  def edit
    find_event
    @venues          = find_event.venues
    marker_image_url = ActionController::Base.helpers.asset_path("buoy-icon.png").to_s
    @hash            = Gmaps4rails.build_markers(@venues) do |venue, marker|
      marker.lat venue.latitude
      marker.lng venue.longitude
      marker.picture({
        :url => marker_image_url,
        :width => "32",
        :height => "32"
      })
      marker.infowindow "#{venue.name}<br>#{venue.street}"
    end
  end

  def new
    @event  = Event.new
    @people = Person.all
    @venues = Venue.all
    @now    = Time.now.to_datetime
  end

  def create
    if hash_tag.nil?
      hash_tag = "#YoBuoy"
    else
      hash_tag = "#" + safe_params[:hash_tag] 
    end
    event_response = graph.graph_call("/me/events",{
      name:         safe_params[:name],
      description:  safe_params[:description],
      start_time:   safe_params[:start_time].in_time_zone,
      privacy_type: safe_params[:privacy],
      access_token: current_user.oauth_token}, "POST")
    safe_params[:fb_id] << event_response["id"]

    @event = Event.create safe_params
    redirect_to @event, notice: 'Event successfully created.'
  end

  def update
    find_event
    start_time = safe_params[:start_time].in_time_zone
    end_time = safe_params[:end_time].in_time_zone

    if @event.update(safe_params)
      redirect_to @event, notice: 'Event successfully updated.'
      graph.put_connections(safe_params[:fb_id], "event", {
        name:        safe_params[:name], 
        description: safe_params[:description], 
        privacy:     safe_params[:privacy],
        start_time:  start_time,
        end_time:    end_time,
        no_feed_story: false,
        location: "#{@venue_name}"
      })
      #graph.put_connections(safe_params[:fb_id], "feed", :message => safe_params[:description])

    else
      render action: "edit"
    end

  end

  def destroy
    find_event
    graph.delete_connections(safe_params[:fb_id], "event")
    @event.destroy
    redirect_to events_path, :alert => "Successfully deleted #{@event.name}."
  end
  
 

private
  
  def graph
    @graph ||= Koala::Facebook::API.new(current_user.oauth_token)
  end
  def safe_params
    params.require(:event).permit(
      :id,
      :fb_id, 
      :name, 
      :description, 
      :start_time, 
      :end_time, 
      :privacy,
      :hash_tag, 
      venues_attributes: [
        :fb_id, 
        :name, 
        :street, 
        :latitude, 
        :longitude, 
        :id]
      )
  end

  def find_event
    @event = Event.find safe_params[:id]
  rescue ActiveRecord::RecordNotFound
    redirect_to root_path
  end

  def save_update_event
    if @event.save
      flash[:notice] = "Event saved successfully"
      redirect_to @event
    else
      render 'new'
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue ActiveRecord::RecordNotFound
  end 

  helper_method :current_user
end
