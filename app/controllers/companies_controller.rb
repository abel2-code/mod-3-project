class CompaniesController < ApplicationController

    def index
        companies = Company.all
        render json: companies, include: :products
    end

    def create
        company = Company.create(name: params[:name], email: params[:email], password: params[:password])
        render json: company
    end
end
