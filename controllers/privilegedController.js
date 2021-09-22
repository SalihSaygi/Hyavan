import Privileged from '../models/privilegedModel.js'
//Read METHODS

//Finding an Privileged with id
export const findOnePrivileged = (req, res) => {
    Privileged.findById(req.params.id)
        .then((Privileged) => {
            if (!Privileged) {
                return res.status(404).json({
                    message: "Couldn't find the Privileged with id: " + req.id,
                })
            }
            res.status(200).json({
                Privileged
            }
            )
            console.log(Privileged)
        })
        .catch((err) => {
            return res.status(500).json({
                message: err + "\n| Found it but couldn't retrieve the Privileged with id: " + req.params.id + " |"
            })
        })
}

export const findAllPrivileged = (req, res) => {
    Privileged.find({})
        .sort({ name: -1 })
        .limit(20)
        .then((Privilegeds) => {
            res.status(200).json({
                Privilegeds
            }
            )
            console.log(Privilegeds)
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Couldn't get Privilegeds for some reason ¯\\_(ツ)_/¯"
            })
        })

}

//Delete METHODS

export const deletePrivileged = (req, res) => {
    Privileged.findByIdAndRemove(req.params.id)
        .then((Privileged) => {
            if (!Privileged) {
                return res.status(404).json({
                    message: "Couldn't find the Privileged with id: " + req.params.id
                })
            }
            res.status(200).json(
                {
                    message:
                        "Deleted the Privileged with id: " + req.params.id
                }
            )
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Couldn't delete Privileged"
            })
        })
}

export const updatePrivileged = (req, res) => {
    if (!req.body.password || !req.body.name) {
        return res.status(400).json({
            message: "Fill in the required fields"
        })
    }
    Privileged.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((Privileged) => {
            if (!Privileged) {
                return res.status(404).json({
                    message: "Couldn't find the Privileged with id: " + req.params.id,
                })
            }
            res.status(200).json(Privileged)
        })
        .catch((err) => {
            return res.status(200).json(
                { message: err + "\n| Found it but couldn't retrieve the Privileged with id: " + req.params.id + " |" }
            );
        });
};