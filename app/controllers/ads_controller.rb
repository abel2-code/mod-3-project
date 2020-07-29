class AdsController < ApplicationController

    def index
        ads = Ad.all
        render json: ads
    end

    def create
        ad = Ad.create(company: params[:company])
        render json: ad
    end
end
