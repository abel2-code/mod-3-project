class CustomersController < ApplicationController

    def index 
        customers = Customer.all
        render json: customers, include: :posts
    end

    def create
        customer = Customer.create(username: params[:username], email: params[:email], password: params[:password], address: params[:address])   
        render json: customer
    end
end
