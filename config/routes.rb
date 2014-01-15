Buoy::Application.routes.draw do
  get "venues/index"
  root 'events#index'

  #Omniauth routing controls
  get 'auth/:provider/callback', to: 'sessions#create'
  get '/users/auth/facebook/callback', to: redirect('/accounts/auth/facebook/callback')
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'
  
  resources :venues
  resources :events 
end
