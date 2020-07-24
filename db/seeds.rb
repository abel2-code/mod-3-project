# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Customer.destroy_all
Company.destroy_all
Product.destroy_all
Ad.destroy_all
Post.destroy_all

user = Customer.create(username: "Mark1", email: "mpd@gmail.com", password: "password", address: "123 Fake Street" )
company = Company.create(name: "Google", email: "google@gmail.com", password: "password1")
product = Product.create(name: "shirt1", image: "insert_url", price: 20, company_id: 1)
post = Post.create(content: "This company is good, products are great", customer_id: 1, company_id: 1)
ad = Ad.create(company_id: 1)

