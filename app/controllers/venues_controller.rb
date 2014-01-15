class VenuesController < ApplicationController
  def index
  	@venues = Venue.all
  end

  def show
    find_venue
    @venues =          find_venue.venues
    @users =           User.all
    marker_image_url = ActionController::Base.helpers.asset_path("buoy-icon.png").to_s
    @hash =            Gmaps4rails.build_markers(@venues) do |venue, marker|
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
    @event = Event.find(params[:event_id])
    @venue = Venue.new
  end
  
  def create
    @venue = Venue.find safe_params(params[:id])
  end
  def edit
  	@venue = Venue.find params[:id]
  end

  def find_venue
    @venue = Venue.find params[:id]
  rescue ActiveRecord::RecordNotFound
    redirect_to root_path
  end

  def save_update_venue
    if @venue.save
      flash[:notice] = "Spot saved successfully"
      redirect_to @venue
    else
      render 'new'
    end
  end

  def safe_params
    params.require(:venue).permit(
      :id,
      :fb_id, 
      :name, 

      :name, 
      :street, 
      :latitude, 
      :longitude

      )
  end

end
