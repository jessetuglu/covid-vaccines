class UpdateWantsMail2 < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :wants_mail, :boolean, :default => true
  end
end
