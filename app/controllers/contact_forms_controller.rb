class ContactFormsController < ApplicationController
  def new
    @contact_form = ContactForm.new
  end

  def create
    @contact_form = ContactForm.new(contact_form_params)

    if @contact_form.valid?
      ContactFormMailer.send_contact_email(@contact_form).deliver_now
      flash[:notice] = "Your message has been sent successfully."
      redirect_to thank_you_contact_forms_path
    else
      flash[:alert] = "There was an error with your submission."
      render :new
    end
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:service, :name, :phone, :email, :postcode, :message, :gdpr_consent)
  end
end
