class ContactFormMailer < ApplicationMailer
  def send_contact_email(contact_form)
    @contact_form = contact_form
    mail(
      to: "jaydenthelwell02@example.com",
      subject: "New Contact Form Submission",
      from: @contact_form.email
    )
  end
end
