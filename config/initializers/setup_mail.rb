ActionMailer::Base.delivery_method = :sendmail

ActionMailer::Base.sendmail_settings = {
  address: "smtp.mailgun.org",
  port: 587,
  domain: "gmail.com",
  user_name: "wansteadwags@gmail.com",
  password: "Becks135!",
  authentication: "plain",
  enable_starttls_auto: true
}