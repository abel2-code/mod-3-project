class PostsController < ApplicationController

    def index
        posts = Post.all
        render json: posts
    end

    def create
        post = Post.create(company: params[:company], customer: params[:customer], content: params[:content])
        render json: post
    end
end
