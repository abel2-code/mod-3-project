class AdsController < ApplicationController

    def index
        ads = Ad.all
        render json: ads
    end
end
