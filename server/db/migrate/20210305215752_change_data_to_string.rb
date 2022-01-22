class ChangeDataToString < ActiveRecord::Migration[6.0]
  def change
    change_column :reports, :data, :text
  end
end
