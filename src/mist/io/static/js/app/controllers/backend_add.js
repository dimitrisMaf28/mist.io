define('app/controllers/backend_add', ['app/models/backend'],
    //
    //  Backend Add Controller
    //
    //  @returns Class
    //
    function (Backend) {

        'use strict';

        return Ember.Object.extend({


            //
            //
            //  Properties
            //
            //


            callback: null,
            provider: null,


            //
            //
            //  Methods
            //
            //


            open: function (callback) {
                this._clear();
                this.view.clear();
                this.view.open();
                this.set('callback', callback);
            },


            close: function () {
                this._clear();
                this.view.close();
                this.view.clear();
            },


            add: function () {

                var provider = this.get('provider');
                var fields = getProviderFields(provider).filterBy('isSlider', undefined);

                var payload = {
                    title: provider.title,
                    provider: provider.provider,
                };
                fields.forEach(function (field) {
                    payload[field.name] = field.value;
                });

                var that = this;
                Mist.backendsController.addBackend({
                    payload: payload,
                    callback: function (success, backend) {
                        that._giveCallback(success, backend);
                        if (success) that.close();
                    }
                });
            },


            //
            //
            //  Pseudo-Private Methods
            //
            //


            _clear: function () {
                this.setProperties({
                    callback: null,
                    provider: null,
                });
            },


            _giveCallback: function (success, backend) {
                if (this.callback) this.callback(success, backend);
            },
        });
    }
);
