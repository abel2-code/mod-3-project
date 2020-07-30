require 'faker'
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


100.times do
    Customer.create([{
        username: "#{Faker::FunnyName.unique.name}",
        email: Faker::Internet.unique.email,
        password: "password",
        address: Faker::Address.unique.street_address,
        }]
    )
end

10.times do
    Company.create([{
        name: Faker::Company.unique.name,
        email: Faker::Internet.unique.email,
        password: "password1",
    }])

    Ad.create([{
    company: Company.last
}])
end

50.times do
    Product.create([{
        name: Faker::Commerce.product_name,
        image: ["https://hips.hearstapps.com/del.h-cdn.co/assets/18/06/1517928338-delish-mongolian-ramen-and-meatballs-still001.jpg", "https://www.jacquelinescatering.ca/image/hotdog.jpg", "https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/24170246/ING-yukon-gold-potato-main.jpg", "https://friendlystock.com/wp-content/uploads/2018/06/5-happy-strawberry-character-cartoon-clipart.jpg", "https://cdn.carbuzz.com/gallery-images/1600/523000/700/523781.jpg", "https://www.dollargeneral.com/media/catalog/product/cache/0729a8e318a86bbdd225c6c8aa5967a3/t/o/toastmaster_toaster.jpg", "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/7501057372246", "https://i.ebayimg.com/images/g/Nd0AAOSw5oVdPuE7/s-l400.jpg", "https://i.guim.co.uk/img/media/a11168cf68ddcb75e39513f1bd120e041aa6f7e2/538_284_4384_2630/master/4384.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=7ae500eade83ac49082d2edb91bf55fe", "https://www.etro.com/on/demandware.static/-/Sites-etro_master/default/dwdf3e4620/images/products/view_type_prod_pdp/201D1372196420990_SB_01.jpg", "https://media.playmobil.com/i/playmobil/6527_product_detail/Pianist%20with%20Piano?locale=en-US,en,*&$pdp_product_main_xl$&strip=true&qlt=80&fmt.jpeg.chroma=1,1,1&unsharp=0,1,1,7&fmt.jpeg.interlaced=true", "https://m.media-amazon.com/images/I/719q2PJNlFL._AC_255_.jpg", "https://i.pinimg.com/originals/a0/3d/37/a03d37ccceb0e90ceda7d12065474d3b.jpg", "https://digital.hammacher.com/Items/91974/91974_1000x1000.jpg", "https://ae01.alicdn.com/kf/HTB108rYJBLoK1RjSZFuq6xn0XXa1/free-shipping-high-quality-happy-rabbit-kite-flying-children-kites-with-handle-line-outdoor-toys-kites.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqjZtq05KkbVTW9aV8zJkPXvYK96XK9IKngg&usqp=CAU", "https://cdn.shopify.com/s/files/1/0084/9282/products/DSCF0418_2400x.png?v=1566245104", "https://img.letgo.com/images/b5/b9/b4/25/b5b9b425ce9f7b3f5481fb859f5df135.jpg?impolicy=img_600", "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg", "https://cdn.shopify.com/s/files/1/1832/4455/products/1153_S17_IconShirt_MendocinoBlue_FR_2048x2048.jpg?v=1572027022"].sample,
        price: (1..25000).to_a.sample,
        company: Company.all.sample,
    }])
end

100.times do
    Post.create([{
        customer: Customer.all.sample,
        company: Company.all.sample,
        content: Faker::Hipster.sentence
    }])
end

# Ad.create([{
#     company: Company.last
# }])