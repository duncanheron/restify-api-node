const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const DrawingSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		artist: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['pending', 'active'],
			default: 'pending',
		},
	},
	{ minimize: false }
);

DrawingSchema.plugin(timestamps);
DrawingSchema.plugin(mongooseStringQuery);

const Drawing = mongoose.model('Drawing', DrawingSchema);
module.exports = Drawing;