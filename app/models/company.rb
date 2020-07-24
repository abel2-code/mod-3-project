class Company < ApplicationRecord
  has_secure_password
  has_many :products
  has_one :ad
  has_many :posts
  has_many :customers, through: :posts
end
