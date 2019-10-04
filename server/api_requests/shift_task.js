module.exports = function(app, sequelize, models){

    console.log('shift_task requests loaded');

    let Task = models.Task;

    /**
     *   This request gets all the shifts for a specific task
     *   arguments :
     *               id_task: the id of the task
     *   returns :
     *               a json array of shifts
     */
    app.get('/shift_task/:id_task', function(req, res){
        Task.findByPk(req.params.id_task)
            .then(task => {
                task.getShifts()
                    .then(ret => {
                        res.send({'shifts': ret});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });


    /**
     *  This request adds an array of shifts to the task.
     *  arguments:
     *              id_task: the id of the task
     *              shift_ids: the array of shifts
     *  returns:
     *              a json array of shifts
     */
    app.post('/shift_task/:id_task', function(req, res){
        Task.findByPk(req.params.id_task)
            .then(task => {
                task.addShifts(req.body.shift_ids)
                    .then(ret => {
                        res.send({'task': ret});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });

    });

    /**
     *  This request updates the shifts of a task
     *  arguments:
     *              id_task: the id of the task
     *              shift_ids: the array of shifts
     *  returns:
     *              a json array of shifts
     */
    app.put('/shift_task/:id_task', function(req, res){
        Task.findByPk(req.params.id_task)
            .then(task => {
                task.setShifts(req.body.shift_ids)
                    .then(() => {
                        task.getShifts()
                            .then(ret => {
                                res.send({'shifts': ret});
                            })
                            .catch(err => {
                                res.status(500).send({'error': err});
                            });
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request deletes the specified shifts from a task
     *  arguments:
     *              id_task: the id of the task
     *              shift_ids: the array of shifts
     *  returns:
     *              a json array of shifts
     */
    app.delete('/shift_task/:id_task', function(req, res){
        Task.findByPk(req.params.id_task)
            .then(task => {
                task.removeShifts(req.body.shift_ids)
                    .then(() => {
                        task.getShifts()
                            .then(ret => {
                                res.send({'shifts': ret});
                            })
                            .catch(err => {
                                res.status(500).send({'error': err});
                            });
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });
};