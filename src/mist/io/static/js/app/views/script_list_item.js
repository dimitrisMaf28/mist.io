define('app/views/script_list_item', ['app/views/list_item'],
    //
    //  Script List Item View
    //
    //  @returns Class
    //
    function (ListItemView) {

        'use sctrict';

        return ListItemView.extend({

            updateCheckbox: function () {
                var element = this.$('input.ember-checkbox');
                Ember.run.next(this, function () {
                    if (element.checkboxradio) {
                        element.checkboxradio()
                               .checkboxradio('refresh');
                    }
                });
            },

            selectedObserver: function () {
                Ember.run.once(this, 'updateCheckbox');
            }.observes('script.selected')
        });
    }
);
