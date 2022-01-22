class User < ApplicationRecord
  has_secure_password

  validates :email, 'valid_email_2/email': { mx: true, disposable_with_whitelist: true }
  validates_uniqueness_of :email, :case_sensitive => false
  scope :without_user, lambda{|user| user ? {:conditions => ["id != ?", user.id]} : {} }
end
