module ContentfulHelper
  def render_rich_text(content)
    return if content.blank?

    content["content"].map do |node|
      case node["nodeType"]
      when "paragraph"
        "<p>#{render_text_content(node)}</p>"
      when "heading-4"
        "<h4>#{render_text_content(node)}</h4>"
      when "heading-1"
        "<h1>#{render_text_content(node)}</h1>"
      when "heading-2"
        "<h2>#{render_text_content(node)}</h2>"
      when "embedded-asset-block"
        render_embedded_asset(node)
      else
        ""
      end
    end.join.html_safe
  end

  private

  def render_text_content(node)
    # Extract the text content from the node, handling nested content
    node["content"].map { |c| c["value"] }.join
  end

  def render_embedded_asset(node)
    # Log the entire node to inspect its structure
    Rails.logger.debug "Rendering node: #{node.inspect}"

    # Extract the asset from the embedded node
    asset = node["data"]["target"]
    return "<p>Asset not found.</p>" unless asset

    # Log the entire asset's fields to see their structure
    Rails.logger.debug "Asset fields: #{asset.fields.inspect}"

    # Check if the asset has the 'file' field
    file_field = asset.fields["file"]
    if file_field.nil?
      Rails.logger.warn "No 'file' field found for asset: #{asset.id}. Skipping image render."
      return "<p>Missing image file for this asset.</p>" # Fallback message for missing image
    end

    # Log the raw 'file' data to check its structure
    Rails.logger.debug "File field data: #{file_field.inspect}"

    # Check if the 'url' is present in the 'file' field
    image_url = file_field.url
    if image_url.nil? || image_url.empty?
      Rails.logger.warn "No valid URL found for asset: #{asset.id}. Skipping image render."
      return "<p>Missing image URL for this asset.</p>" # Fallback message for missing image URL
    end

    # Explicitly handle the URL from Contentful
    # Ensure that the URL is fully qualified by prepending 'https:' if necessary
    unless image_url.start_with?("http")
      image_url = "https:" + image_url
    end

    # Make sure the URL starts with the Contentful CDN domain if it's missing
    unless image_url.include?("cdn.contentful.com")
      image_url = "https://cdn.contentful.com" + image_url
    end

    # Log the final image URL before rendering
    Rails.logger.debug "Final image URL: #{image_url}"

    # Ensure the image URL is correct
    return "<p>Missing image URL for this asset.</p>" if image_url.blank?

    # Use the title or default to a generic title for the image
    title = asset.fields["title"] || "Embedded Image"

    # Return the HTML for the image
    "<img src='#{image_url}' alt='#{title}' />".html_safe
  end
end
