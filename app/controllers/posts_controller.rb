class PostsController < ApplicationController

    def index
        posts = Post.all
        render json: posts
    end

    def create
        post = Post.create(company_id: params[:company_id], customer_id: params[:customer_id], content: params[:content])
        render json: post
    end
end
