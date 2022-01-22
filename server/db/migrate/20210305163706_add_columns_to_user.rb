class AddColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :latest_city, :string
  end
end
