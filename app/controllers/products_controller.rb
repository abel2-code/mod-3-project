class ProductsController < ApplicationController

    def index
        products = Product.all
        render json: products
    end

    def create
        product = Product.create(company: params[:company], name: params[:name], image: params[:image], price: params[:price])
        render json: product
    end
end
