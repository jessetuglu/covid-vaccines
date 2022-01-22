class CreateNewDataField < ActiveRecord::Migration[6.0]
  def change
    add_column :reports , :data, :jsonb
  end
end
