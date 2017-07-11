(function ($) {
    $(function () {
        var is_spiel_form = $('#spiel-node-form').length == 1;
        var is_newcomer_form = $('#newcomer-node-form').length == 1;

        if (is_spiel_form || is_newcomer_form) {

            //PREPARED VALUES AND DATA

            var field_result_value_id = 'final_field_availability_show_result';
            var field_costs_value_id = 'final_field_availability_show_cost';
            var field_error_values_id = 'final_field_availability_show_error';
            var field_progress_values_id = 'final_field_availability_show_progress';

            var node_form_additional_action_module_button_next_id = '#button_next';
            var node_form_additional_action_module_button_previous_id = '#button_previous';


            //uids that is used more than one times
            var pictures_field_id = '#edit-field-screenshots-artworks';
            var spielkonzept_field_id = '#edit-field-spielkonzept';
            var link_zum_spiele_value_id = '#edit-field-link-zum-spiel-und-0-value';
            var art_des_codes_value_id = '#edit-field-art-des-codes-und-0-value';
            var zugangs_codes_value_id = '#edit-field-zugangscodes';
            var jury_preise_id = '#edit-field-jury-preise-und';

            //Elements that if checked let the elements show up or hide
            var ftp_server_id_0 = '#edit-field-ftp-server-vorhanden-und-0';
            var ftp_server_id_1 = '#edit-field-ftp-server-vorhanden-und-1';
            var post_zusendung = '#edit-field-links-codes-und';
            var online_inhalte = '#edit-field-online-inhalte-und';
            var no_access_codes = '#edit-field-keine-zugangscodes-benotig-und';
            //ID's from elements to how or hide
            var ftp_server_is_0 = ['#field-benutzername-add-more-wrapper',
                '#field-hinweis-kommentar-add-more-wrapper',
                '#field-server-adresse-add-more-wrapper',
                '#field-passwort-add-more-wrapper'];
            var ftp_server_is_1 = ['#edit-field-link'];
            var online_inhalte_is_checked = ['#field-link-zum-spiel-add-more-wrapper',
                '#edit-field-keine-zugangscodes-benotig', '#edit-field-art-des-codes',
                '#edit-field-zugangscodes'];
            var no_access_codes_unchecked = ['#edit-field-art-des-codes',
                '#edit-field-zugangscodes'];
            //Others
            var einreichung_abschliessen_id = '#edit-field-einreichung-abgeschlossen-und';

            var add_fields_dependencies_field_ids = [];
            add_fields_dependencies_field_ids.push(ftp_server_id_0);
            add_fields_dependencies_field_ids.push(ftp_server_id_1);
            var add_fields_dependencies_fields_values = [];
            add_fields_dependencies_fields_values.push(['#edit-field-benutzername-und-0-value',
                '#edit-field-hinweis-kommentar-und-0-value',
                '#edit-field-server-adresse-und-0-value',
                '#edit-field-passwort-und-0-value']);
            add_fields_dependencies_fields_values.push(['#edit-field-link-und-0-value']);

            var add_fields_dependencies_fields_values_types_ftp_server_is_0 = [];
            add_fields_dependencies_fields_values_types_ftp_server_is_0.push(['text', 'text', 'text', 'text']);
            var add_fields_dependencies_fields_values_types_ftp_server_is_1 = [];
            add_fields_dependencies_fields_values_types_ftp_server_is_1.push(['url']);
            var add_fields_dependencies_fields_values_types = [];
            add_fields_dependencies_fields_values_types['0'] = add_fields_dependencies_fields_values_types_ftp_server_is_0;
            add_fields_dependencies_fields_values_types['1'] = add_fields_dependencies_fields_values_types_ftp_server_is_1;

            var all_needs_to_set_always_ids = [];
            all_needs_to_set_always_ids.push('#edit-field-spiel-website-und-0-value');
            all_needs_to_set_always_ids.push('#edit-body-und-0-value');
            all_needs_to_set_always_ids.push('#edit-field-genre-und-select');
            all_needs_to_set_always_ids.push('#edit-field-entwickler-und-0-value');
            all_needs_to_set_always_ids.push('#edit-field-entwickler-website-und-0-value');
            all_needs_to_set_always_ids.push('#edit-field-publisher-und-0-value');
            all_needs_to_set_always_ids.push('#edit-field-publisher-website-und-0-value');
            all_needs_to_set_always_ids.push('#edit-field-plattformen-und-select');
            all_needs_to_set_always_ids.push('#edit-field-release-datum-und-0-value');
            all_needs_to_set_always_ids.push('#edit-field-usk-einstufung-und');
            all_needs_to_set_always_ids.push(jury_preise_id);
            all_needs_to_set_always_ids.push(pictures_field_id);
            all_needs_to_set_always_ids.push(spielkonzept_field_id);
            var all_needs_to_set_check_type = [];
            all_needs_to_set_check_type.push('url');
            all_needs_to_set_check_type.push('textarea');
            all_needs_to_set_check_type.push('choice_indirect');
            all_needs_to_set_check_type.push('text');
            all_needs_to_set_check_type.push('url');
            all_needs_to_set_check_type.push('text');
            all_needs_to_set_check_type.push('url');
            all_needs_to_set_check_type.push('choice_indirect');
            all_needs_to_set_check_type.push('date');
            all_needs_to_set_check_type.push('choice_indirect');
            all_needs_to_set_check_type.push('choice_indirect');
            all_needs_to_set_check_type.push('pictures');
            all_needs_to_set_check_type.push('files');

            //create an array with all fields
            var all_fields = [];
            $(all_needs_to_set_always_ids).each(function (i, v) {
                all_fields.push(v);
            });
            $(add_fields_dependencies_fields_values).each(function (i, v) {
                $(v).each(function (i, v) {
                    all_fields.push(v);
                });
            });
            all_fields.push(post_zusendung);
            all_fields.push(online_inhalte);
            all_fields.push(link_zum_spiele_value_id);
            all_fields.push(art_des_codes_value_id);

            //Add field to show the result of the process
            if (is_newcomer_form) {
                /*$('#newcomer-node-form').before('<p><div id="'+field_costs_value_id+'">Die Kosten für in die einzureichenden Kategorien belaufen sich insgesamt auf 0 €.</div></p>');*/
                $('#newcomer-node-form').before('<p><span id="' + field_result_value_id + '">Fortschritt: Es sind 0 % der Form ausgefüllt.</span><br/><progress id="' + field_progress_values_id + '" value="10" max="100"></progress></p>');
                $('#newcomer-node-form').before('<p><div id="' + field_error_values_id + '" style="color:#d0137e;"></div></p>');
            } else if (is_spiel_form) {
                $('#spiel-node-form').before('<p><div id="' + field_costs_value_id + '">Die Kosten für in die einzureichenden Kategorien belaufen sich insgesamt auf 0 €.</div></p>');
                $('#spiel-node-form').before('<p><span id="' + field_result_value_id + '">Fortschritt: Es sind 0 % der Form ausgefüllt.</span><br/><progress id="' + field_progress_values_id + '" value="10" max="100"></progress></p>');
                $('#spiel-node-form').before('<p><div id="' + field_error_values_id + '" style="color:#d0137e;"></div></p>');
            }

            //A--------------------------Field availability--------------------------A
            showEinreichenAbschliessenIfAllAvailable(
                all_needs_to_set_always_ids,
                all_needs_to_set_check_type,
                einreichung_abschliessen_id,
                add_fields_dependencies_field_ids,
                add_fields_dependencies_fields_values,
                add_fields_dependencies_fields_values_types,
                online_inhalte,
                post_zusendung,
                link_zum_spiele_value_id,
                art_des_codes_value_id,
                zugangs_codes_value_id,
                no_access_codes,
                field_result_value_id,
                field_error_values_id,
                is_spiel_form,
                is_newcomer_form,
                field_progress_values_id,
                field_costs_value_id,
                jury_preise_id);

            all_fields.forEach(function (v) {

                $('#edit-field-screenshots-artworks').bind("DOMNodeInserted", function (event) {
                    showEinreichenAbschliessenIfAllAvailable(
                        all_needs_to_set_always_ids,
                        all_needs_to_set_check_type,
                        einreichung_abschliessen_id,
                        add_fields_dependencies_field_ids,
                        add_fields_dependencies_fields_values,
                        add_fields_dependencies_fields_values_types,
                        online_inhalte,
                        post_zusendung,
                        link_zum_spiele_value_id,
                        art_des_codes_value_id,
                        zugangs_codes_value_id,
                        no_access_codes,
                        field_result_value_id,
                        field_error_values_id,
                        is_spiel_form,
                        is_newcomer_form,
                        field_progress_values_id,
                        field_costs_value_id,
                        jury_preise_id);
                });


                $('#edit-field-zugangscodes .form-text:last-child').change(function () {
                    showEinreichenAbschliessenIfAllAvailable(
                        all_needs_to_set_always_ids,
                        all_needs_to_set_check_type,
                        einreichung_abschliessen_id,
                        add_fields_dependencies_field_ids,
                        add_fields_dependencies_fields_values,
                        add_fields_dependencies_fields_values_types,
                        online_inhalte,
                        post_zusendung,
                        link_zum_spiele_value_id,
                        art_des_codes_value_id,
                        zugangs_codes_value_id,
                        no_access_codes,
                        field_result_value_id,
                        field_error_values_id,
                        is_spiel_form,
                        is_newcomer_form,
                        field_progress_values_id,
                        field_costs_value_id,
                        jury_preise_id);
                });

                $('.field-add-more-submit').click(function () {
                    showEinreichenAbschliessenIfAllAvailable(
                        all_needs_to_set_always_ids,
                        all_needs_to_set_check_type,
                        einreichung_abschliessen_id,
                        add_fields_dependencies_field_ids,
                        add_fields_dependencies_fields_values,
                        add_fields_dependencies_fields_values_types,
                        online_inhalte,
                        post_zusendung,
                        link_zum_spiele_value_id,
                        art_des_codes_value_id,
                        zugangs_codes_value_id,
                        no_access_codes,
                        field_result_value_id,
                        field_error_values_id,
                        is_spiel_form,
                        is_newcomer_form,
                        field_progress_values_id,
                        field_costs_value_id,
                        jury_preise_id);
                });


                $(v).change(function () {
                    showEinreichenAbschliessenIfAllAvailable(
                        all_needs_to_set_always_ids,
                        all_needs_to_set_check_type,
                        einreichung_abschliessen_id,
                        add_fields_dependencies_field_ids,
                        add_fields_dependencies_fields_values,
                        add_fields_dependencies_fields_values_types,
                        online_inhalte,
                        post_zusendung,
                        link_zum_spiele_value_id,
                        art_des_codes_value_id,
                        zugangs_codes_value_id,
                        no_access_codes,
                        field_result_value_id,
                        field_error_values_id,
                        is_spiel_form,
                        is_newcomer_form,
                        field_progress_values_id,
                        field_costs_value_id,
                        jury_preise_id);
                });

            });
            //E--------------------------Field availability--------------------------E

            //A--------------------------Dependencies--------------------------A
            showOnChecked(ftp_server_id_0, ftp_server_is_0);
            showOnChecked(ftp_server_id_1, ftp_server_is_1);
            showOnChecked(online_inhalte, online_inhalte_is_checked);
            if ($(online_inhalte).is(":checked")) {
                hideOnChecked(no_access_codes, no_access_codes_unchecked);
            }

            $(ftp_server_id_0).click(function () {
                showOnChecked($(this), ftp_server_is_0);
                showOnChecked(ftp_server_id_1, ftp_server_is_1);
                showEinreichenAbschliessenIfAllAvailable(
                    all_needs_to_set_always_ids,
                    all_needs_to_set_check_type,
                    einreichung_abschliessen_id,
                    add_fields_dependencies_field_ids,
                    add_fields_dependencies_fields_values,
                    add_fields_dependencies_fields_values_types,
                    online_inhalte,
                    post_zusendung,
                    link_zum_spiele_value_id,
                    art_des_codes_value_id,
                    zugangs_codes_value_id,
                    no_access_codes,
                    field_result_value_id,
                    field_error_values_id,
                    is_spiel_form,
                    is_newcomer_form,
                    field_progress_values_id,
                    field_costs_value_id,
                    jury_preise_id);
            });

            $(ftp_server_id_1).click(function () {
                showOnChecked(ftp_server_id_0, ftp_server_is_0);
                showOnChecked($(this), ftp_server_is_1);
                showEinreichenAbschliessenIfAllAvailable(
                    all_needs_to_set_always_ids,
                    all_needs_to_set_check_type,
                    einreichung_abschliessen_id,
                    add_fields_dependencies_field_ids,
                    add_fields_dependencies_fields_values,
                    add_fields_dependencies_fields_values_types,
                    online_inhalte,
                    post_zusendung,
                    link_zum_spiele_value_id,
                    art_des_codes_value_id,
                    zugangs_codes_value_id,
                    no_access_codes,
                    field_result_value_id,
                    field_error_values_id,
                    is_spiel_form,
                    is_newcomer_form,
                    field_progress_values_id,
                    field_costs_value_id,
                    jury_preise_id);
            });

            $(online_inhalte).click(function () {
                showOnChecked($(this), online_inhalte_is_checked);
                $(no_access_codes).prop('checked', false);
                showEinreichenAbschliessenIfAllAvailable(
                    all_needs_to_set_always_ids,
                    all_needs_to_set_check_type,
                    einreichung_abschliessen_id,
                    add_fields_dependencies_field_ids,
                    add_fields_dependencies_fields_values,
                    add_fields_dependencies_fields_values_types,
                    online_inhalte,
                    post_zusendung,
                    link_zum_spiele_value_id,
                    art_des_codes_value_id,
                    zugangs_codes_value_id,
                    no_access_codes,
                    field_result_value_id,
                    field_error_values_id,
                    is_spiel_form,
                    is_newcomer_form,
                    field_progress_values_id,
                    field_costs_value_id,
                    jury_preise_id);
            });

            $(no_access_codes).click(function () {
                if ($(online_inhalte).is(":checked")) {
                    hideOnChecked($(this), no_access_codes_unchecked);
                }
                showEinreichenAbschliessenIfAllAvailable(
                    all_needs_to_set_always_ids,
                    all_needs_to_set_check_type,
                    einreichung_abschliessen_id,
                    add_fields_dependencies_field_ids,
                    add_fields_dependencies_fields_values,
                    add_fields_dependencies_fields_values_types,
                    online_inhalte,
                    post_zusendung,
                    link_zum_spiele_value_id,
                    art_des_codes_value_id,
                    zugangs_codes_value_id,
                    no_access_codes,
                    field_result_value_id,
                    field_error_values_id,
                    is_spiel_form,
                    is_newcomer_form,
                    field_progress_values_id,
                    field_costs_value_id,
                    jury_preise_id);
            });
            //E--------------------------Dependencies--------------------------E

            $('#spiel-node-form a, #newcomer-node-form a').click(function () {
                if ($('#spiel-node-form .last.selected, #newcomer-node-form .last.selected').length) {
                    $(node_form_additional_action_module_button_next_id).hide();
                } else {
                    $(node_form_additional_action_module_button_next_id).show();
                }
            });

            $(node_form_additional_action_module_button_next_id).click(function () {
                if ($('#spiel-node-form .last.selected, #newcomer-node-form .last.selected').length) {
                    $(node_form_additional_action_module_button_next_id).hide();
                } else {
                    $(node_form_additional_action_module_button_next_id).show();
                }
            });

            $(node_form_additional_action_module_button_previous_id).click(function () {
                if ($('#spiel-node-form .last.selected, #newcomer-node-form .last.selected').length) {
                    $(node_form_additional_action_module_button_next_id).hide();
                } else {
                    $(node_form_additional_action_module_button_next_id).show();
                }
            });

        }

    });

    //A*************************HELPER FUNCTIONS***************************A
    var isURL = function (url) {
        //following Match 'http://' too
        var regexp = /(https|http|ftp):\/\/(www)\.|([a-z0-9A-Z]+\.[a-z0-9A-Z]+\.[a-zA-Z]{2,4})|([a-z0-9A-Z]+\.[a-zA-Z]{2,4})|\?([a-zA-Z0-9]+[\&\=\#a-z]+)/;

        //BACKUP original regex
        //var regexp = /(https|http|ftp):\/\/|([a-z0-9A-Z]+\.[a-z0-9A-Z]+\.[a-zA-Z]{2,4})|([a-z0-9A-Z]+\.[a-zA-Z]{2,4})|\?([a-zA-Z0-9]+[\&\=\#a-z]+)/;

        return regexp.test(url);
    };

    var getDependentField = function (source, target_array) {
        var fields = [];

        if ($(source).is(":checked")) {
            target_array.forEach(function (entry) {
                fields.push(entry);
            });
        }

        return fields;
    };

    var showOnChecked = function (source, target_array) {
        if ($(source).is(":checked")) {
            target_array.forEach(function (entry) {
                $(entry).show();
            });
        } else {
            target_array.forEach(function (entry) {
                $(entry).hide();
            });
        }
    };

    var hideOnChecked = function (source, target_array) {
        if ($(source).is(":checked")) {
            target_array.forEach(function (entry) {
                $(entry).hide();
            });
        } else {
            target_array.forEach(function (entry) {
                $(entry).show();
            });
        }
    };

    var areAllFieldAvalailable = function (all_needs_to_set_always_ids,
                                           all_needs_to_set_check_type,
                                           einreichung_abschliessen_id,
                                           add_fields_dependencies_field_ids,
                                           add_fields_dependencies_fields_values,
                                           add_fields_dependencies_fields_values_types,
                                           online_inhalte,
                                           post_zusendung,
                                           link_zum_spiele_value_id,
                                           art_des_codes_value_id,
                                           zugangs_codes_value_id,
                                           no_access_codes,
                                           field_result_value_id,
                                           field_error_values_id,
                                           is_spiel_form,
                                           is_newcomer_form,
                                           field_progress_values_id,
                                           field_costs_value_id,
                                           jury_preise_id) {

        var ret = true;
        var count_set_field = 0;
        var count_max_field = 0;
        //ALWAYS add ids AND type to check
        var curr_all_needs_to_set_always_ids = all_needs_to_set_always_ids.slice();
        var curr_all_needs_to_set_check_type = all_needs_to_set_check_type.slice();
        var curr_to_adding_types = [];
        var curr_index;

        $('#' + field_error_values_id).text('');

        //TODO: Feld für per post schickende oder online-inhalte muss gesetzt sein
        count_max_field++;

        if (
            ($(online_inhalte).is(":unchecked") && $(post_zusendung).is(":checked"))
            ||
            ($(online_inhalte).is(":checked") && $(post_zusendung).is(":unchecked"))
        ) {
            count_set_field++;
            var errorElement = '#group-5-schritt-einreichen-error';
            $(errorElement).remove();
        } else {
            var errorElement = 'group-5-schritt-einreichen-error';
            if ($('#' + errorElement).length == 0) {
                $('.group-5-schritt').prepend('<p id="' + errorElement + '" style="color:#d0137e;">Fehlende Angabe über die Bereitstellung</p>');
            }
        }


        //A--------------------------------add Fields which dependend on another field-------------------------A
        //Add Field with dependencies to other fields (dynamical via arrays)
        $(add_fields_dependencies_field_ids).each(function (i, v) {
            if ($(v).is(":checked")) {

                $(add_fields_dependencies_fields_values_types[i]).each(function (i, v) {
                    $(v).each(function (i, v) {
                        curr_to_adding_types.push(v);
                    });
                });

                $(add_fields_dependencies_fields_values[i]).each(function (i, v) {
                    curr_all_needs_to_set_always_ids.push(v);
                });

                $(curr_to_adding_types).each(function (i, v) {
                    curr_all_needs_to_set_check_type.push(v);
                });
            }
        });

        //add hardcoded fields für online-inhalte

        if ($(online_inhalte).is(":checked")) {
            curr_all_needs_to_set_always_ids.push(link_zum_spiele_value_id);
            curr_all_needs_to_set_check_type.push('url');
            if ($(no_access_codes).is(":unchecked")) {
                curr_all_needs_to_set_always_ids.push(art_des_codes_value_id);
                curr_all_needs_to_set_check_type.push('text');

                curr_all_needs_to_set_always_ids.push(zugangs_codes_value_id);
                curr_all_needs_to_set_check_type.push('multitext');
            }
        }
        //E--------------------------------add Fields which dependend on another field-------------------------E

        $(curr_all_needs_to_set_always_ids).each(function (i, v) {
            var check_type = curr_all_needs_to_set_check_type[i];
            var value = $(v).val();

            if (v == jury_preise_id && is_newcomer_form) {
                //Tue nichts wenn das Kategorie-Feld für die Newcomer verarbeitet werden soll.
                //Es ist nicht gesetzt
            }
            else if (check_type == 'files' && is_spiel_form) {

            }
            else if (check_type == 'files' && is_newcomer_form) {
                count_max_field++;
                var counter = 0;
                var number_of_needed_values = 1;

                $(v + ' .file').each(function (i, v) {
                    counter++;
                    console.log('file');
                });

                var missing_values = number_of_needed_values - counter;

                if (counter >= number_of_needed_values) {
                    count_set_field++;
                    var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                    $(errorElement).remove();
                } else {
                    var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                    $(errorElement).remove();
                    $('<p id="' + errorElement.substring(1) + '" style="color:#d0137e;">Spielkonzept fehlt</p>').insertBefore(curr_all_needs_to_set_always_ids[i]);
                }

            } else {
                count_max_field++;
                if (check_type == 'url') {
                    if (isURL(value) && value != 'http://www.') {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        createAndShowErrorMessage(
                            '#' + field_error_values_id,
                            curr_all_needs_to_set_always_ids[i],
                            null,
                            is_spiel_form,
                            is_newcomer_form);
                    }

                } else if (check_type == 'text') {

                    if (value) {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        createAndShowErrorMessage(
                            '#' + field_error_values_id,
                            curr_all_needs_to_set_always_ids[i],
                            null,
                            is_spiel_form,
                            is_newcomer_form);
                    }

                } else if (check_type == 'textarea') {

                    if (value) {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        createAndShowErrorMessage(
                            '#' + field_error_values_id,
                            curr_all_needs_to_set_always_ids[i],
                            null,
                            is_spiel_form,
                            is_newcomer_form);
                    }

                } else if (check_type == 'pictures') {
                    var counter = 0;
                    var number_of_needed_values = 10;

                    $(v + ' .image-preview').each(function (i, v) {
                        counter++;
                    });

                    var missing_values = number_of_needed_values - counter;

                    if (counter >= number_of_needed_values) {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                        $('<p id="' + errorElement.substring(1) + '" style="color:#d0137e;">' + 'Es fehlen noch ' + missing_values + ' Bilder</p>').insertBefore(curr_all_needs_to_set_always_ids[i]);
                    }
                }


                else if (check_type == 'multitext') {
                    var number_of_needed_values = $(jury_preise_id + ' input:checked').length * 8;
                    counter = 0;
                    $(v + ' .form-text').each(function (i, z) {
                        if ($(z).val() != '') {
                            counter++;
                        }
                    });

                    var missing_values = number_of_needed_values - counter;
                    if (counter >= number_of_needed_values) {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                        $('<p id="' + errorElement.substring(1) + '" style="color:#d0137e;">' + 'Es fehlen noch ' + missing_values + ' Zugangcodes</p>').insertBefore(curr_all_needs_to_set_always_ids[i]);
                    }
                }

                else if (check_type == 'choice') {

                    if (value && value != '_none') {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        createAndShowErrorMessage(
                            '#' + field_error_values_id,
                            curr_all_needs_to_set_always_ids[i],
                            null,
                            is_spiel_form,
                            is_newcomer_form);
                    }

                } else if (check_type == 'choice_indirect') {

                    if (v == jury_preise_id && is_spiel_form) {
                        var costs = 50 * $(jury_preise_id + ' input:checked').length;

                        $('#' + field_costs_value_id).html('Die Kosten für in die einzureichenden Kategorien belaufen sich insgesamt auf ' + costs + ' €.');
                    }

                    var val_found = false;
                    //suche zuerst in checkbox-feldern
                    $(v + ' .form-checkbox').each(function (i, v) {
                        if ($(v).is(":checked")) {
                            val_found = true;
                        }
                    });

                    //wenn in checkbox-feldern nichts gefunden suche in radio-feldern
                    if (!val_found) {
                        $(v + ' .form-radio').each(function (i, v) {
                            if ($(v).is(":checked")) {
                                val_found = true;
                            }
                        });
                    }

                    //wenn in radio-feldern nichts gefunden suche in feldern für text-feldern
                    var counter = 0;
                    var min_counter = 8;

                    if (!val_found) {
                        $(v + ' .form-text').each(function (i, v) {
                            if ($(v).val()) {
                                counter++;
                            }
                        });
                    }

                    if (counter >= min_counter) {
                        val_found = true;
                    }

                    if (val_found) {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        createAndShowErrorMessage(
                            '#' + field_error_values_id, curr_all_needs_to_set_always_ids[i],
                            null,
                            is_spiel_form,
                            is_newcomer_form);
                    }

                } else if (check_type == 'date') {

                    var counter = 0;
                    var number_of_needed_values = 3;

                    $(v + ' .form-select').each(function (i, v) {
                        if ($(v).val()) {
                            counter++;
                        }
                    });

                    if (counter >= number_of_needed_values) {
                        count_set_field++;
                        var errorElement = curr_all_needs_to_set_always_ids[i] + '-einreichen-error';
                        $(errorElement).remove();
                    } else {
                        createAndShowErrorMessage(
                            '#' + field_error_values_id, curr_all_needs_to_set_always_ids[i],
                            null,
                            is_spiel_form,
                            is_newcomer_form);
                    }

                } else {
                    createAndShowErrorMessage(
                        '#' + field_error_values_id,
                        null,
                        'Es wurde keine passende Typprüfung gefunden. Bitte wenden Sie sich an den Administrator.',
                        is_spiel_form,
                        is_newcomer_form);
                }
            }
        });

        var finished_percent = 100 / count_max_field * count_set_field;

        return finished_percent;
    };

    var showEinreichenAbschliessenIfAllAvailable = function (all_needs_to_set_always_ids,
                                                             all_needs_to_set_check_type,
                                                             einreichung_abschliessen_id,
                                                             add_fields_dependencies_field_ids,
                                                             add_fields_dependencies_fields_values,
                                                             add_fields_dependencies_fields_values_types,
                                                             online_inhalte,
                                                             post_zusendung,
                                                             link_zum_spiele_value_id,
                                                             art_des_codes_value_id,
                                                             zugangs_codes_value_id,
                                                             no_access_codes,
                                                             field_result_value_id,
                                                             field_error_values_id,
                                                             is_spiel_form,
                                                             is_newcomer_form,
                                                             field_progress_values_id,
                                                             field_costs_value_id,
                                                             jury_preise_id) {

        //füge zu jedem code ein event hinzu das wenn dieser geändert eine neu ermittlung stattfindet ob einreichung abgeschlossen ist
        $('#edit-field-zugangscodes').unbind("DOMNodeInserted");
        $('#edit-field-zugangscodes').bind("DOMNodeInserted", function (event) {
            showEinreichenAbschliessenIfAllAvailable(
                all_needs_to_set_always_ids,
                all_needs_to_set_check_type,
                einreichung_abschliessen_id,
                add_fields_dependencies_field_ids,
                add_fields_dependencies_fields_values,
                add_fields_dependencies_fields_values_types,
                online_inhalte,
                post_zusendung,
                link_zum_spiele_value_id,
                art_des_codes_value_id,
                zugangs_codes_value_id,
                no_access_codes,
                field_result_value_id,
                field_error_values_id,
                is_spiel_form,
                is_newcomer_form,
                field_progress_values_id,
                field_costs_value_id,
                jury_preise_id);
            $('#edit-field-zugangscodes .form-text:last-child').change(function () {
                showEinreichenAbschliessenIfAllAvailable(
                    all_needs_to_set_always_ids,
                    all_needs_to_set_check_type,
                    einreichung_abschliessen_id,
                    add_fields_dependencies_field_ids,
                    add_fields_dependencies_fields_values,
                    add_fields_dependencies_fields_values_types,
                    online_inhalte,
                    post_zusendung,
                    link_zum_spiele_value_id,
                    art_des_codes_value_id,
                    zugangs_codes_value_id,
                    no_access_codes,
                    field_result_value_id,
                    field_error_values_id,
                    is_spiel_form,
                    is_newcomer_form,
                    field_progress_values_id,
                    field_costs_value_id,
                    jury_preise_id);
            });
        });

        var result = areAllFieldAvalailable(
            all_needs_to_set_always_ids,
            all_needs_to_set_check_type,
            einreichung_abschliessen_id,
            add_fields_dependencies_field_ids,
            add_fields_dependencies_fields_values,
            add_fields_dependencies_fields_values_types,
            online_inhalte,
            post_zusendung,
            link_zum_spiele_value_id,
            art_des_codes_value_id,
            zugangs_codes_value_id,
            no_access_codes,
            field_result_value_id,
            field_error_values_id,
            is_spiel_form,
            is_newcomer_form,
            field_progress_values_id,
            field_costs_value_id,
            jury_preise_id);
        if (result == 100) {
            $(einreichung_abschliessen_id).removeAttr('disabled');
        } else {
            $(einreichung_abschliessen_id).attr('disabled', 'disabled');
        }

        var rounded_result = Math.round(result);

        $('#' + field_progress_values_id).prop('value', rounded_result);
        $('#' + field_result_value_id).text('Fortschritt: Es sind ' + rounded_result + ' % der Form ausgefüllt');
    };

    var convertIdToUserText = function (field_id,
                                        is_spiel_form,
                                        is_newcomer_form) {
        var kein_datum = 'Kein Datum ausgewählt im Feld ';
        var keine_auswahl = 'Keine getroffene Auswahl im Feld ';
        var keine_bilder = 'Fehlende oder ungültige Bilder in dem Feld ';
        var kein_text = 'Fehlender oder nicht gültiger Text in dem Feld ';
        var keine_url = 'Fehlende oder nicht gültige URL in dem Feld ';


        //format all ids that them without '#' at the beginning
        curr_field_id = field_id.replace('#', '');

        var sourceField = [];
        var userFieldValue = [];
        sourceField.push('edit-field-spiel-website-und-0-value');
        userFieldValue.push(keine_url + 'Spielwebseite der Spielinfo-Kategorie');
        sourceField.push('edit-body-und-0-value');
        userFieldValue.push(kein_text + 'Spielbeschreibung der Spielinfo-Kategorie');
        sourceField.push('edit-field-genre-und-select');
        userFieldValue.push(keine_auswahl + 'Genre der Spielinfo-Kategorie');
        if (is_newcomer_form) {
            sourceField.push('edit-field-entwickler-und-0-value');
            userFieldValue.push(kein_text + 'Entwickler/Studententeam der Spielinfo-Kategorie');
            sourceField.push('edit-field-publisher-und-0-value');
            userFieldValue.push(kein_text + 'Hochschule der Spielinfo-Kategorie');
            sourceField.push('edit-field-publisher-website-und-0-value');
            userFieldValue.push(keine_url + 'Hochschul Webseite der Spielinfo-Kategorie');
        } else {//gehedavon aus das es ein Spiel ist wenn kein Newcomer
            sourceField.push('edit-field-entwickler-und-0-value');
            userFieldValue.push(kein_text + 'Entwickler-Studio der Spielinfo-Kategorie');
            sourceField.push('edit-field-publisher-und-0-value');
            userFieldValue.push(kein_text + 'Publisher der Spielinfo-Kategorie');
            sourceField.push('edit-field-publisher-website-und-0-value');
            userFieldValue.push(keine_url + 'Publisher-Webseite der Spielinfo-Kategorie');
        }
        sourceField.push('edit-field-entwickler-website-und-0-value');
        userFieldValue.push(keine_url + 'Entwickler Website der Spielinfo-Kategorie');
        sourceField.push('edit-field-plattformen-und-select');
        userFieldValue.push(keine_auswahl + 'Plattform der Spielinfo-Kategorie');
        sourceField.push('edit-field-release-datum-und-0-value');
        userFieldValue.push(kein_datum + 'Veröffentlichkeitsdatum der Spielinfo-Kategorie');
        sourceField.push('edit-field-usk-einstufung-und');
        userFieldValue.push(keine_auswahl + 'USK-Einstufung der Spielinfo-Kategorie');
        sourceField.push('edit-field-jury-preise-und');
        userFieldValue.push(keine_auswahl + 'Kategorien der Kategorien-Kategorie');
        sourceField.push('edit-field-screenshots-artworks');
        userFieldValue.push(keine_bilder + 'Screenshots/Artworks/Coverart der Materialien-Kategorie');
        sourceField.push('edit-field-server-adresse-und-0-value');
        userFieldValue.push(keine_url + 'Server-Adresse der Trailer-Quelle der Materialien-Kategorie');
        sourceField.push('edit-field-benutzername-und-0-value');
        userFieldValue.push(kein_text + 'Benutzername der Trailer-Quelle der Materialien-Kategorie');
        sourceField.push('edit-field-passwort-und-0-value');
        userFieldValue.push(kein_text + 'Passwort der Trailer-Quelle der Materialien-Kategorie');
        sourceField.push('edit-field-hinweis-kommentar-und-0-value');
        userFieldValue.push(kein_text + 'Hinweis/Kommentar der Trailer-Quelle der Materialien-Kategorie');
        sourceField.push('edit-field-link-und-0-value');
        userFieldValue.push(keine_url + 'Link der Trailer-Quelle der Materialien-Kategorie');
        sourceField.push('edit-field-link-zum-spiel-und-0-value');
        userFieldValue.push(keine_url + 'Link zum Spiel der Bereitstellung-Kategorie');
        sourceField.push('edit-field-art-des-codes-und-0-value');
        userFieldValue.push(kein_text + 'Art des Codes der Bereitstellung-Kategorie');
        sourceField.push('field-zugangscodes-values');
        userFieldValue.push(keine_auswahl + 'Zugangscodes der Bereitstellung-Kategorie');


        var fieldName = 'FieldNotFound';

        $(sourceField).each(function (i, v) {
            if (v == curr_field_id) {
                fieldName = userFieldValue[i];
            }
        });

        return fieldName;
    };

    var createAndShowErrorMessage = function (field_error_values_id,
                                              field_id,
                                              basicString,
                                              is_spiel_form,
                                              is_newcomer_form) {
        if (field_id) {
            var userMessage = convertIdToUserText(field_id, is_spiel_form, is_newcomer_form);
            if (userMessage) {
                var errorElement = field_id.substring(1) + '-einreichen-error';
                if ($('#' + errorElement).length == 0) {
                    $('<p id="' + errorElement + '" style="color:#d0137e;">' + userMessage + '</p>').insertBefore(field_id);
                }

            } else {
                $(errorElement).remove();
            }
        } else if (basicString) {
            $(field_id).prepend('<p id="' + errorElement + '" style="color:#d0137e;">' + basicString + '</p>');
        } else {
            $(field_id + ' #' + errorElement).remove();
        }
    };

    var createAndShowElementErrorMessage = function (field_id,
                                                     basicString,
                                                     is_spiel_form,
                                                     is_newcomer_form) {
        if (field_id) {
            var errorElement = field_id.substring(1) + '-einreichen-error';
            if (basicString) {
                $(field_id).prepend('<p id="' + errorElement + '" style="color:#d0137e;">' + basicString + '</p>');
            } else {
                $('#' + errorElement).remove();
            }
        }
    };

    //E*************************HELPER FUNCTIONS***************************E
}(jQuery));