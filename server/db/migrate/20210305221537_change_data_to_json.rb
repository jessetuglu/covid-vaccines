class ChangeDataToJson < ActiveRecord::Migration[6.0]
  def change
    remove_column :reports,:data
  end
end
