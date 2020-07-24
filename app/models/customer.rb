class Customer < ApplicationRecord
  has_secure_password
  has_many :posts
  has_many :companies, through: :posts
end
