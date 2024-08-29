const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
	case "production":
		ENV_FILE_NAME = ".env.production";
		break;
	case "staging":
		ENV_FILE_NAME = ".env.staging";
		break;
	case "test":
		ENV_FILE_NAME = ".env.test";
		break;
	case "development":
	default:
		ENV_FILE_NAME = ".env";
		break;
}

try {
	dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const cloudinaryConfigured = CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET;

const ADMIN_APP_PORT = process.env.PORT || 7001;

const fileServicePlugin = cloudinaryConfigured
	? {
			resolve: `medusa-file-cloudinary`,
			options: {
				cloud_name: CLOUDINARY_CLOUD_NAME,
				api_key: CLOUDINARY_API_KEY,
				api_secret: CLOUDINARY_API_SECRET,
				secure: true,
			},
	  }
	: {
			resolve: `@medusajs/file-local`,
			options: {
				upload_dir: "uploads",
			},
	  };

const plugins = [
	`medusa-fulfillment-manual`,
	`medusa-payment-manual`,
	fileServicePlugin,
	{
		resolve: "@medusajs/admin",
		/** @type {import('@medusajs/admin').PluginOptions} */
		options: {
			autoRebuild: true,
			develop: {
				open: process.env.OPEN_BROWSER !== "false",
				port: ADMIN_APP_PORT,
			},
		},
	},
	{
		resolve: `medusa-payment-stripe`,
		options: {
			api_key: process.env.STRIPE_API_KEY,
			webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
		},
	},
	{
		resolve: `medusa-plugin-brevo-email`,
		options: {
			api_key: process.env.BREVO_API_KEY,
			from_email: process.env.BREVO_FROM_EMAIL,
			from_name: process.env.BREVO_FROM_NAME,
			bcc: process.env.BREVO_BCC || null,

			contact_list: {
				enabled: process.env.BREVO_CONTACT_LIST_ENABLED || true,
				contact_list_id: process.env.BREVO_CONTACT_LIST_ID || 2,
			},

			pdf: {
				enabled: process.env.BREVO_PDF_ENABLED || false,
				settings: {
					font: process.env.BREVO_PDF_FONT || "Helvetica",
					// [{file: 'yourfont.ttf', name: 'yourfont'},{file: 'yourfont-bold.ttf', name: 'yourfontbold'}]
					format: process.env.BREVO_PDF_FORMAT || "A4",
					// see supported formats here: https://pdfkit.org/docs/paper_sizes.html
					margin: {
						top: process.env.BREVO_PDF_MARGIN_TOP || "50",
						right: process.env.BREVO_PDF_MARGIN_RIGHT || "50",
						bottom: process.env.BREVO_PDF_MARGIN_BOTTOM || "50",
						left: process.env.BREVO_PDF_MARGIN_LEFT || "50",
					},
					empty: "", // what to show if variable can't be found. Defaults to __UNDEFINED__
				},
				header: {
					enabled: process.env.BREVO_PDF_HEADER_ENABLED || false,
					content: process.env.BREVO_PDF_HEADER_CONTENT || null,
					// loads empty header if null, otherwise loads the file from `BREVO_PDF_HEADER_CONTENT`
					height: process.env.BREVO_PDF_HEADER_HEIGHT || "50",
				},
				footer: {
					enabled: process.env.BREVO_PDF_FOOTER_ENABLED || false,
					content: process.env.BREVO_PDF_FOOTER_CONTENT || null,
					// loads empty footer if null, otherwise loads the file from `BREVO_PDF_FOOTER_CONTENT`
				},
				templates: {
					invoice: process.env.BREVO_PDF_INVOICE_TEMPLATE || null,
					credit_note: process.env.BREVO_PDF_CREDIT_NOTE_TEMPLATE || null,
					return_invoice: process.env.BREVO_PDF_RETURN_INVOICE_TEMPLATE || null,
				},
			},
			events: {
				order: {
					placed: process.env.BREVO_ORDER_PLACED || 11,
					canceled: process.env.BREVO_ORDER_CANCELED || null,
					shipment_created: process.env.BREVO_ORDER_SHIPMENT_CREATED || null,
				},
				customer: {
					created: process.env.BREVO_CUSTOMER_CREATED || null,
					password_reset: process.env.BREVO_CUSTOMER_PASSWORD_RESET || null,
				},
				user: {
					created: process.env.BREVO_USER_CREATED || null,
					password_reset: process.env.BREVO_USER_PASSWORD_RESET || null,
				},
				auth: {
					password_reset: process.env.BREVO_AUTH_PASSWORD_RESET || null,
					verify_account: process.env.BREVO_AUTH_VERIFY_ACCOUNT || null,
				},
				activity: {
					inactive_user: process.env.BREVO_ACTIVITY_INACTIVE_USER || null,
					inactive_customer: process.env.BREVO_ACTIVITY_INACTIVE_CUSTOMER || null,
				},
			},
			upsell: {
				enabled: process.env.BREVO_UPSELL_ENABLED || false,
				template: process.env.BREVO_UPSELL_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
				delay: process.env.BREVO_UPSELL_DELAY || 9, // delay in days
				valid: process.env.BREVO_UPSELL_VALID || 30, // valid in days
				collection: process.env.BREVO_UPSELL_COLLECTION || null,
			},
			abandoned_cart: {
				enabled: process.env.BREVO_ABANDONED_CART_ENABLED || false,
				first: {
					delay: process.env.BREVO_ABANDONED_CART_FIRST_DELAY || 1, // delay in hours
					template: process.env.BREVO_ABANDONED_CART_FIRST_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
				},
				second: {
					delay: process.env.BREVO_ABANDONED_CART_SECOND_DELAY || 24, // delay in hours
					template: process.env.BREVO_ABANDONED_CART_SECOND_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
				},
				third: {
					delay: process.env.BREVO_ABANDONED_CART_THIRD_DELAY || 48, // delay in hours
					template: process.env.BREVO_ABANDONED_CART_THIRD_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
				},
			},
			default_data: {
				// ... default data to be passed to the email template
				product_url: process.env.BREVO_PRODUCT_URL || "",
				product_name: process.env.BREVO_PRODUCT_NAME || "",
				company_name: process.env.BREVO_COMPANY_NAME || "",
				company_address: process.env.BREVO_COMPANY_ADDRESS || "",
			},
		},
	},
];

const modules = {
	/*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
	jwtSecret: process.env.JWT_SECRET,
	cookieSecret: process.env.COOKIE_SECRET,
	store_cors: STORE_CORS,
	database_url: DATABASE_URL,
	admin_cors: ADMIN_CORS,
	// Uncomment the following lines to enable REDIS
	redis_url: REDIS_URL,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
	projectConfig,
	plugins,
	modules,
};
