const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class MsgValidation extends Validation {
    /**
     * @param {String} profile.from
     * @param {String} profile.to
     * @param {String} profile.content
     * @returns
     * @memberof AuthValidation
     */
    message(profile) {
        return this.Joi
            .object({
                from: this.Joi
                    .string()
                    .required(),
                to: this.Joi
                    .string()
                    .required(),
                content: this.Joi
                    .string()
                    .trim()
                    .min(1)
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} profile.from
     * @param {String} profile.room
     * @returns
     * @memberof AuthValidation
     */
    getAllMessages(profile) {
        return this.Joi
            .object({
                from: this.Joi
                    .string()
                    .required(),
                to: this.Joi
                    .string()
                    .required(),
            })
            .validate(profile);
    }
}

module.exports = new MsgValidation();
