class UserMailer < ApplicationMailer
  default from: 'notifications@covid-19-vaccination-app.com'
  def welcome_email
    @user = params[:user]
    mail(to: @user.email,
         body: "Welcome to the service #{@user.first_name}!<br/> I hope you will enjoy it! Make sure you have selected a state in your profile, as that's the area the emails will target. <br/> If you would like to stop receiving these updates, unsubscribe here: https://covid-vaccines.netlify.app/login. <br/>Best wishes, <br/>Jesse",
         content_type: "text/html",
         subject: "COVID-19 CVS Vaccine App (Thanks for signing up!)"
    )
  end
  def deletion_email
    @user = params[:user]
    mail(to: @user.email,
         subject: 'COVID-19 CVS Vaccine App (Account Deletion Confirmation)',
         content_type: "text/html",
         body:"Hello #{@user.first_name}, this email is just to confirm that your account has been deleted.<br/>Thank you! <br/>Best wishes, <br/>Jesse"
    )
  end
  def update_preferences
    @user = params[:user]
    @message = params[:wants_mail] ? "Hello #{@user.first_name}, this email is just to confirm that you want to be receiving emails" : "Hello #{@user.first_name}, this email is just to confirm that you DO NOT want to be receiving emails"
    mail(to: @user.email,
         subject: 'COVID-19 CVS Vaccine App (Mailing Preferences Changed)',
         content_type: "text/html",
         body:@message+"Thank you!<br/>Best wishes, <br/>Jesse"
    )
  end
  def update_email
    @user = params[:user]
    @locations = params[:cities]
    mail(to: @user.email,
         subject:'COVID-19 CVS Vaccine App (COVID-19 Vaccines Available Near You!)',
         content_type: "text/html",
         body:"Hello #{@user.first_name}, this email is to notify you that new spots have/are opened up in #{@user.state} in the following locations:\n #{@locations.join(",<br/>")}.
          You can reserve a spot by clicking here: https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns<br/>
          If you would like to stop receiving these updates, unsubscribe here: https://covid-vaccines.netlify.app/login.<br/>
          Best wishes,<br/>
          Jesse"
    )
  end
end
