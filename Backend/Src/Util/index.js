import counterModel from "../Model/counter.model.js";

const getNextSequence = async (
    sequenceName,
    startValue = 100000
) => {

    try {

        // find existing counter
        let counter = await counterModel.findOne({
            counterId: sequenceName
        });

        // create counter first time
        if (!counter) {

            counter = await counterModel.create({
                counterId: sequenceName,

                // first value
                seq: startValue
            });

            return counter.seq;
        }

        // increment existing counter
        counter = await counterModel.findOneAndUpdate(

            {
                counterId: sequenceName
            },

            {
                $inc: {
                    seq: 1
                }
            },

            {
                returnDocument: "after"
            }

        );

        return counter.seq;

    } catch (error) {

        console.log(error);

        throw new Error(
            "Error generating sequence!"
        );

    }

};

export { getNextSequence };