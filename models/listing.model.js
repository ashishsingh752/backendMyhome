import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          // Ensure discountPrice is less than or equal to regularPrice
          return !this.offer || value <= this.regularPrice;
        },
        message: 'Discount price should be less than or equal to regular price',
      },
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    furnished: {
      type: Boolean,
      required: true,
      default: false,
    },
    parking: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      type: String,
      required: true,
      enum: ['sale', 'rent'],
    },
    offer: {
      type: Boolean,
      required: true,
      default: false,
    },
    imageUrls: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: 'At least one image URL is required',
      },
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
