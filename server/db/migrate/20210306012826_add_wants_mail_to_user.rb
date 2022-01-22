class AddWantsMailToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :wants_mail,:boolean
  end
end
