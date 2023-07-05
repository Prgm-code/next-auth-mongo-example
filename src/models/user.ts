
import { Schema, model , models  } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        selected : false
    },
    fullname : {
        type : String,
        required : [true, 'Fullname is required'],
        minlength : [6, 'Fullname must be at least 6 characters'],
        maxlength : [50, 'Fullname must be at most 50 characters']
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

const User = models.User || model('User',userSchema)
export default User;

