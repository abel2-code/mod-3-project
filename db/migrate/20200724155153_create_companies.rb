class CreateCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :slogan
      t.string :logo

      t.timestamps
    end
  end
end
