class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports do |t|
      t.binary :data

      t.timestamps
    end
  end
end
