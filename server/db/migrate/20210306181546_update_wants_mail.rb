class UpdateWantsMail < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :wants_mail, :boolean, :default => false
  end
end
