import { useEffect, useRef } from "react";
import "../../public/css/slider.css"


function Slider(data) {

    const sliderRef = useRef(null);
    useEffect(() => {

        if (sliderRef.current) {
            let data_sliders = {};

            function slider(node, data) {

                if (((typeof data == "object") ? Array.isArray(data.items) ? data.items.length > 0 : false : false)) {
                    $(node).html("");
                    let size_max_visible_items;



                    if (data.resize ? Array.isArray(data.resize) : false) {
                        let resize_order = data.resize.sort((a, b) => parseInt(a.size) - parseInt(b.size));

                        for (let i = 0; i < resize_order.length; i++) {
                            const value = resize_order[i];
                            if (window.innerWidth <= parseInt(value.size)) {
                                size_max_visible_items = value.visible_items;
                                break;
                            }
                        }


                        if (size_max_visible_items == null) {
                            size_max_visible_items = data.visible_items;
                        }


                    }
                    const visible_items = size_max_visible_items ? size_max_visible_items : (data.visible_items ? data.visible_items : 1);
                    const count_items = data.items.length;
                    const porcented_position = 100 / visible_items;
                    const first_item = data.first_item ? data.first_item : 1;
                    let duration_transition = count_items - (visible_items) <= 1 ? 0 : (data.duration_transition ? data.duration_transition : 0.5);

                    const div_slider = document.createElement("div");
                    div_slider.classList.add("main-slider");

                    $(div_slider).attr("data-slider-id", Object.keys(data_sliders).length)
                    data_sliders[Object.keys(data_sliders).length] = {};


                    if (count_items > visible_items) {
                        $(div_slider).append((data.icon_left ? "<div data-type='left' class='slider-button'>" + data.icon_left + "</div>" : `  <div class="content-slider-button">
            <button data-type="left" class="slider-button"> < </button>
          </div>`));
                    }

                    $(div_slider).append(`
        <div class="slider-content-items">
        </div>
        `);

                    if (count_items > visible_items) {
                        $(div_slider).append(data.icon_left ? "<div data-type='right' class='slider-button'>" + data.icon_right + "</div>" : `  <div class="content-slider-button">
            <button data-type="right" class="slider-button">  </button>
          </div>`);
                    }

                    data.items.map((value, index) => {
                        let position = (index + 1) - first_item;
                        let position_porcented = (position * porcented_position) + ((-1 * (index)) * (porcented_position));

                        if ((index + 1) < first_item) {
                            position_porcented = position_porcented + (porcented_position * count_items);
                        }

                        let position_now = ((index) + ((position_porcented * visible_items) / 100));


                        $(div_slider).find(".slider-content-items").append("<div data-position='" + position_now + "' data-initial-position='" + (index) + "' style='left:" + position_porcented + "% ;width:" + porcented_position + "%' class='content-item'>" + value + "</div>")
                    })

                    $(div_slider).find(".slider-button").on("click", function () {
                        let transition_increment = parseFloat($(div_slider).attr("data-transition-increment"));
                        let slider_id = $(div_slider).attr("data-slider-id")

                        clearTimeout(data_sliders[slider_id]["interval_stop_transition_increment"]);

                        if (transition_increment == null || isNaN(transition_increment)) {
                            transition_increment = 0;
                            $(div_slider).attr("data-transition-increment", transition_increment);
                        }

                        let new_duration_transition = (duration_transition - transition_increment) > 0.01 ? duration_transition - transition_increment : 0.01;

                        if ($(div_slider).attr("data-transition") != "true") {
                            $(div_slider).attr("data-transition", "true");
                            const type_button = $(this).attr("data-type");
                            const direction_movement = type_button == "left" ? 1 : -1;
                            let move_element = false;


                            var positions = $(div_slider).find('.content-item').map(function () {
                                return parseInt($(this).attr('data-position'));
                            }).get();

                            positions.sort(function (a, b) {
                                return a - b;
                            });


                            let position_high = positions[positions.length - 1];
                            let position_less = positions[0];

                            if (direction_movement != 1) {
                                if (position_less < 0) {
                                    move_element = true;
                                }
                            } else {
                                if (position_high >= visible_items) {
                                    move_element = true;
                                }
                            }

                            if (move_element) {

                                if (direction_movement != 1) {

                                    let position_high_copy = position_high;
                                    position_high = position_less;
                                    position_less = position_high_copy;
                                }

                                const element_reposition = $(div_slider).find(".content-item[data-position='" + position_high + "']");


                                $(element_reposition).css({
                                    "transition": "unset",
                                    "z-index": 100,
                                })

                                $(element_reposition).addClass("unset-transition");

                                const element_reposition_position_initial = parseFloat($(element_reposition).attr("data-initial-position"));
                                const element_reposition_position = parseFloat($(element_reposition).attr("data-position"));
                                const element_reposition_position_move = position_less + (direction_movement * (-1));


                                const porcented_reposition = (element_reposition_position_move - (element_reposition_position_initial)) * porcented_position;

                                $(element_reposition).attr("data-position", element_reposition_position_move);
                                $(element_reposition)[0].style.left = porcented_reposition + "%";

                            }

                            setTimeout(() => {
                                $(div_slider).find(".content-item").map((value, index) => {
                                    $(index).removeClass("unset-transition");

                                    $(index).css({
                                        "transition": "left " + new_duration_transition + "s",
                                        "z-index": 1,
                                    })

                                    let porcented_position_item = parseFloat($(index)[0].style.left.replace("%", ""));
                                    let position_now = parseFloat($(index).attr("data-position"));
                                    $(index)[0].style.left = (porcented_position_item + (direction_movement * porcented_position)) + "%"
                                    $(index).attr("data-position", position_now + direction_movement)

                                    position_now = position_now + direction_movement;

                                    if (position_now > position_high) {
                                        position_high = position_now
                                    }
                                    if (position_now < position_less) {
                                        position_less = position_now
                                    }

                                    setTimeout(() => {
                                        $(div_slider).attr("data-transition", "false");
                                    }, (new_duration_transition * 1000));
                                })
                            }, 200);

                        } else {
                            $(div_slider).attr("data-transition-increment", (transition_increment + 0.05));
                        }

                        const interval_stop_transition_increment = setTimeout(() => {
                            $(div_slider).attr("data-transition-increment", "false");
                        }, (new_duration_transition * 1000) + 500)


                        data_sliders[slider_id]["interval_stop_transition_increment"] = interval_stop_transition_increment;
                    })

                    $(node).append(div_slider)
                    $(node).attr("data-slider", true)
                }
            }


            slider($(sliderRef.current), data.data)
        }


    })

    return (
        <div id="slider" ref={sliderRef}>

        </div>
    )
}


export default Slider;