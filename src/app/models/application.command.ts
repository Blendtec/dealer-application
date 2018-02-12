import { IApplication } from './application.interface';

export class ApplicationCommand {
  constructor(private _formData: IApplication) {}

  public toJSON() {
    return {
        'Dealer' : {
            'contact_first_name': this._formData.contact.firstName,
            'contact_last_name': this._formData.contact.lastName,
            'contact_title': this._formData.contact.title,
            'contact_email': this._formData.contact.email,
            'contact_phone': this._formData.contact.phone,
            'application_name': this._formData.contact.individual,
            'company': this._formData.company.name,
            'dbas': this._formData.company.dbas,
            'company_phone': this._formData.company.phone,
            'company_fax': this._formData.company.fax,
            'shipping_name': this._formData.shippingAddress.name,
            'shipping_address': this._formData.shippingAddress.address,
            'shipping_city': this._formData.shippingAddress.city,
            'shipping_state_id': this._formData.shippingAddress.stateProvince,
            'shipping_zip': this._formData.shippingAddress.zip,
            'shipping_country': this._formData.shippingAddress.country,
            'billing_name': this._formData.billingAddress.name,
            'billing_address': this._formData.billingAddress.address,
            'billing_city': this._formData.billingAddress.city,
            'billing_state_id': this._formData.billingAddress.stateProvince,
            'billing_zip': this._formData.billingAddress.zip,
            'billing_country': this._formData.billingAddress.country,
            'license': this._formData.business.license,
            'license_state_id': this._formData.business.state,
            'tax_exemption': this._formData.business.taxExemptNum,
            'facebook_url': this._formData.social.facebook.url,
            'facebook_stat': String(this._formData.social.facebook.count),
            'twitter_url': this._formData.social.twitter.url,
            'twitter_stat': String(this._formData.social.twitter.count),
            'pinterest_url': this._formData.social.pinterest.url,
            'pinterest_stat': String(this._formData.social.pinterest.count),
            'google_plus_url': this._formData.social.googlePlus.url,
            'google_plus_stat': String(this._formData.social.googlePlus.count),
            'instagram_url': this._formData.social.instagram.url,
            'instagram_stat': String(this._formData.social.instagram.count),
            'blog_url': this._formData.social.blog.url,
            'blog_stat': this._formData.social.blog.count,
            'online_sales_channels': this._formData.sales.channels,
            'is_amazon_seller': String(Number(this._formData.sales.amazon)),
            'amazon_business_names': this._formData.sales.amazonNames,
            'warehouse_location': this._formData.fulfillment.warehouseLocation,
            'other_order_fulfillment_method': this._formData.fulfillment.other,
            '3pl_provider': this._formData.fulfillment.thirdPartyName,
            '3pl_warehouse_locations': this._formData.fulfillment.thirdPartyLocation,
            'unique_market_niche': this._formData.differentiators.how,
            'brand_mission': this._formData.differentiators.what,
            'value_to_us': this._formData.differentiators.value,
            'other_products_carried': this._formData.other.products,
            'marketing_needs': this._formData.other.marketing,
            'physical_store_locations': this._formData.other.locations,
            'ship_direct_to_store': String(Number(this._formData.fulfillment.directToStore)),
            'provide_in_store_demonstrations': String(Number(this._formData.sales.demos)),
            'recaptcha': this._formData.recaptcha
        },
        'DealerWebsite': [
            {
                'url': this._formData.website.url,
                'website_launch_date': {
                    'month': String(this._formData.website.date['date']['month']),
                    'day': String(this._formData.website.date['date']['day']),
                    'year': String(this._formData.website.date['date']['year'])
                },
                'monthly_visits': String(this._formData.website.visits),
                'conversion_rate': String(this._formData.website.conversionRate),
                'annual_revenue': String(this._formData.website.revenue),
                'tools_for_traffic': this._formData.website.tools
            }
        ]
    };
  }
}
