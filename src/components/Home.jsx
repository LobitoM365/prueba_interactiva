import { useEffect, useState } from "react";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import "../../public/css/home.css"
import imgLogo from "../../public/img/logo.png"
import imgLogosRedes from "../../public/img/logos_redes.png"
import icono_mail from "../../public/img/icono_mail.png"
import icono_ubicacion from "../../public/img/icono_ubicacion.png"
import icono_telefono from "../../public/img/icono_telefono.png"

import imgHeader from "../../public/img/header.png"
import img_viajes_grupales from "../../public/img/viajes_grupales.png"
import viajes_a_la_medida from "../../public/img/viajes_a_la_medida.png"
import destinos_para_parejas from "../../public/img/destinos_para_parejas.png"
import logo_whatssapp from "../../public/img/logo_WA.png"
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import Slider from "./slider";
import Swal from "sweetalert2";


function Home() {

    const [company, setCompany] = useState(null);
    const [banners, setBanners] = useState(null);
    const [travels, setTravels] = useState(null);
    const [experiencies, setExperiencies] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [alianzas, setAlianzas] = useState(null);
    const [tags, setTags] = useState(null);

    const base_api_url = "https://api.test.interactiva.net.co";

    function formatTripInfo(dateStart, dateEnd, cost) {
        const months = [
            "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
            "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
        ];

        const parseDate = (date) => {
            const [year, month, day] = date.split("-");
            return new Date(year, month - 1, day);
        };

        const formatDate = (date) => {
            const parsedDate = parseDate(date);
            const day = parsedDate.getDate();
            const month = months[parsedDate.getMonth()];
            return { day, month };
        };

        const start = formatDate(dateStart);
        const end = formatDate(dateEnd);

        const formattedCost = new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(cost);

        return `${start.day} AL ${end.day} DE ${start.month} | DESDE ${formattedCost}`;
    }

    useEffect(() => {

        axios.get(base_api_url + "/api/get-companies/")
            .then(function (data) {
                setCompany(data.data[0])
            })

        axios.get(base_api_url + "/api/get-banners/")
            .then(function (data) {
                setBanners(data.data[0])
            })

        axios.get(base_api_url + "/api/get-travels/")
            .then(function (data) {

                setTravels(data.data)
            })

        axios.get(base_api_url + "/api/get-customer_experiences/")
            .then(function (data) {
                setExperiencies(data.data)
            })

        axios.get(base_api_url + "/api/get-blogs/")
            .then(function (data) {
                setBlogs(data.data)
            })

        axios.get(base_api_url + "/api/get-partners/")
            .then(function (data) {
                setAlianzas(data.data)
            })

        axios.get(base_api_url + "/api/get-tags/")
            .then(function (data) {
                setTags(data.data)
            })
        $("body").on("click", ".item-leer-mas", function () {
            if ($(this).parent().find(".text-leer-mas").hasClass("hidden")) {
                $(this).html("LEER MENOS");
                $(this).parent().find(".text-leer-mas").removeClass("hidden");
                $(this).parent().find(".span-suspensive").addClass("hidden");
            } else {
                $(this).html("LEER MÁS");
                $(this).parent().find(".text-leer-mas").addClass("hidden");
                $(this).parent().find(".span-suspensive").removeClass("hidden");
            }
        })

        $("body").on("click", ".item-experiencia", function () {
            $(".item-experiencia").removeClass("active")
            $(this).addClass("active")

            $("input[name='tags']").val($(this).attr("data-id"))
        })

        $("body").on("submit", "#formContacto", function (e) {
            e.preventDefault();

            const formData = new FormData($(this)[0]);

            axios.post(base_api_url + "/api/set-quotations/", formData)
                .then(function (data) {
                    Swal.fire({
                        title: "!Excelente¡",
                        text: "Se registró tu viaje exitosamente.",
                        icon: "success",
                        draggable: true
                    });
                    $(".h6-error").remove();
                })
                .catch(function (error) {

                    setErros(error.response.data)
                    Swal.fire({
                        title: "!Error de validación¡",
                        text: "Por favor verifica los datos ingresados.",
                        icon: "error",
                        draggable: true
                    });
                });
        });
        $("body").on("submit", "#formSuscribirme", function (e) {
            e.preventDefault();

            const formData = new FormData($(this)[0]);

            axios.post(base_api_url + "/api/set-newsletter/", formData)
                .then(function (data) {
                    Swal.fire({
                        title: "!Excelente¡",
                        text: "Se registró tu correo exitosamente.",
                        icon: "success",
                        draggable: true
                    });
                    $(".h6-error").remove();
                })
                .catch(function (error) {

                    setErros(error.response.data)
                    Swal.fire({
                        title: "!Error de validación¡",
                        text: "Por favor verifica los datos ingresados.",
                        icon: "error",
                        draggable: true
                    });
                });
        });

        function setErros(data) {
            $(".h6-error").remove();
            const keys = Object.keys(data);
            keys.map((value, index) => {
                $("#" + value).parent().append("<h6 class='h6-error'> " + data[value] + "</h6>")
                /* $("#" + value).css("border", "1px solid red") */
            })
        }


        return (() => {
            $("body").off("click")
            $("body").off("submit")
        })
    }, [])

    return (
        <div id="home">
            <div className="nav">
                <div className="logo">
                    <img src={company != null ?? company.logo ? (base_api_url + company.logo) : imgLogo} alt="" />
                </div>
                <nav className="menu-horizontal">
                    <ul>
                        <li>
                            <a href="#inicio">Inicio</a>
                        </li>
                        <li>
                            <a href="#sectionNosotros">Nosotros</a>
                        </li>
                        <li>
                            <a href="#sectionViajes">Viajes</a>
                        </li>
                        <li>
                            <a href="#sectionBlogs">Blogs</a>
                        </li>
                        <li>
                            <a href="#contacto">Contacto</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="content">
                <section id="sectionInicio">
                    <div className="div-img-section-inicio">
                        <img src={banners != null ?? banners.image ? (base_api_url + banners.image) : imgHeader} alt="" />
                    </div>
                    <div className="div-travels-experience">
                        <h1 className="title"> THE TRAVEL
                        </h1>
                        <span className="second-title">EXPERIENCE</span>
                    </div>
                    <div className="items-travels">
                        <div className="item">
                            <div className="content-item">
                                <img className="img-fondo" src={img_viajes_grupales} alt="" />
                                <div className="div-title">
                                    <h4>Viajes grupales</h4>
                                    <i className="icon-chevron fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="content-item">
                                <img className="img-fondo" src={viajes_a_la_medida} alt="" />
                                <div className="div-title">
                                    <h4>Viajes a la medida</h4>
                                    <i className="icon-chevron fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="content-item">
                                <img className="img-fondo" src={destinos_para_parejas} alt="" />
                                <div className="div-title">
                                    <h4>Destinos para parejas</h4>
                                    <i className="icon-chevron fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <section id="sectionNosotros">
                    <div>
                        <div></div>
                        <div className="description-company">
                            <h2 style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>NOSOTROS</h2>
                            <p>{company != null ?? company.description ? company.description : ""}</p>
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <div className="content-icon-ig">
                            <i style={{ background: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="icon-ig fa-brands fa-instagram"></i>
                        </div>
                        <div className="content-feed_instagram">
                            <div className="content-imgs-feed_instagram">
                                {company?.feed_instagram?.length > 0 ? (
                                    company.feed_instagram.map((item, index) => (
                                        <div key={index}>
                                            <div className={"content-img-feed-instagram " + "content-img-feed-instagram-" + (index + 1)}>
                                                <img className={"img-feed-instagram-" + (index + 1) + " img-feed-instagram"} src={base_api_url + "" + item.image} alt={`Instagram post ${index + 1}`} />
                                            </div>

                                            {/* Agrega aquí cualquier propiedad que desees renderizar */}
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay publicaciones en Instagram.</p>
                                )}
                            </div>

                        </div>

                        <div>
                        </div>
                    </div>
                    <div>
                        <div></div>
                        <div className="footer-section" style={{ borderColor: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>
                            <div className="info-account" style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>
                                {company != null ?? company.instagram_account ? company.instagram_account : ""}
                            </div>
                        </div>
                        <div></div>
                    </div>
                </section>
                <section id="sectionViajes">

                    <div>
                        <div >
                            <h2 style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>EXPERIENCIAS GRUPALES</h2>
                        </div>
                        <div className="content-travels">

                            <div className="div-travels">
                                {travels?.length > 0 ? (
                                    () => {
                                        const items_slider = [];

                                        const icon_left = (<div>
                                            <i style={{ borderColor: (company != null ?? company.secundary_color ? company.secundary_color : ""), color: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="icon-chevron fa-solid fa-chevron-left"></i>
                                        </div>);
                                        const icon_right = (<div>
                                            <i style={{ borderColor: (company != null ?? company.secundary_color ? company.secundary_color : ""), color: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="icon-chevron fa-solid fa-chevron-right"></i>
                                        </div>);
                                        const array_travels = [...travels];

                                        array_travels.push(...array_travels);

                                        array_travels.map((item, index) => {

                                            const html = (<div className="div-content-travel" key={index + item.id}>
                                                <div>
                                                    <div className="content-travel">
                                                        <div className="content-img-feed-instagram">
                                                            <img className={"img-feed-instagram-" + (index + 1) + " img-feed-instagram"} src={base_api_url + "" + item.image_cover} alt={`Instagram post ${index + 1}`} />
                                                        </div>
                                                        <div className="status" style={{ background: item.status.color }} >
                                                            {item.status.title}
                                                        </div>
                                                        <div className="info-travel">
                                                            <h4 className="title">{item.title}</h4>
                                                            <h4 style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="cost">{formatTripInfo(item.date_start, item.date_end, item.cost)}</h4>
                                                            <h4 className="description">{item.description}</h4>
                                                        </div>
                                                    </div>
                                                    <div style={{ background: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="footer-travel">
                                                        MÁS INFORMACIÓN
                                                    </div>
                                                </div>
                                            </div>)
                                            const stringHTML = ReactDOMServer.renderToStaticMarkup(html);
                                            items_slider.push(stringHTML);
                                        })

                                        return <Slider data={{
                                            "visible_items": 3,
                                            "items": items_slider,
                                            "resize": [
                                                { "size": "1400", "visible_items": "2" },
                                                { "size": "950", "visible_items": "1" },
                                            ],
                                            "icon_left": ReactDOMServer.renderToStaticMarkup(icon_left),
                                            "icon_right": ReactDOMServer.renderToStaticMarkup(icon_right),
                                        }} ></Slider>
                                    }
                                )() : (
                                    <p>No hay publicaciones en travels.</p>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="content-experiencias-personalizadas">
                        <div >
                            {experiencies?.length > 0 ? (
                                experiencies.map((item, index) => (
                                    <div className="content-info-experiencias-personalizadas" key={index}>

                                        <h2 style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>{item.title}</h2>

                                        <div className="description-info-experiencias-personalizadas">
                                            <img className={"img-feed-instagram-" + (index + 1) + " img-feed-instagram"} src={base_api_url + "" + item.image} alt={`Instagram post ${index + 1}`} />

                                            <div className="text-info-experiencias-personalizadas" >
                                                <div>
                                                    <h4>{item.description}</h4>
                                                    <p>{item.diference_description}</p>
                                                </div>
                                                <button style={{ background: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="button-cotizar-viaje">COTIZAR MI VIAJE</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : ("aa")}
                        </div>
                    </div>

                </section>
                <section style={{ background: (company != null ?? company.secundary_color ? company.secundary_color : "") }} id="sectionBlogs">

                    <div>
                        <h2 className="title">BLOGS</h2>
                        <div className="content-items-blogs">
                            <div className="item-blogs">
                                {blogs?.[0] ? (
                                    <div className="content-img-primary">
                                        <div className="div-img">
                                            <img src={base_api_url + "" + blogs[0].image_content} />
                                        </div>

                                        {
                                            (() => {
                                                const parts_text = blogs[0].description.split("...", 2);
                                                return <div className="info">
                                                    <h4 className="title">{blogs[0].title}</h4>
                                                    <h4 className="description">{parts_text[0]} <span className="span-suspensive">...</span><span className="text-leer-mas hidden">{parts_text[1]}</span></h4>
                                                    <h3 style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="item-leer-mas">LEER MÁS</h3>
                                                </div>
                                            })(
                                            )
                                        }

                                    </div>
                                ) : ("")}
                            </div>
                            <div className="div-items-blogs">
                                <div className="item-blogs">
                                    {blogs?.[1] ? (
                                        <div className="content-img-secondary">
                                            <div className="div-img">
                                                <img src={base_api_url + "" + blogs[1].image_content} />
                                            </div>
                                            <div className="info">
                                                <h4 className="title">{blogs[1].title}</h4>
                                                <h4 className="description text-leer-mas hidden" > {blogs[1].description}</h4>
                                                <h3 style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="item-leer-mas">LEER MÁS</h3>
                                            </div>
                                        </div>
                                    ) : ("")}
                                </div>
                                <div className="item-blogs">
                                    {blogs?.[2] ? (
                                        <div className="content-img-secondary">
                                            <div className="div-img">
                                                <img src={base_api_url + "" + blogs[2].image_content} />
                                            </div>
                                            <div className="info">
                                                <h4 className="title">{blogs[1].title}</h4>
                                                <h4 className="description text-leer-mas hidden" > {blogs[2].description}</h4>
                                                <h3 style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }} className="item-leer-mas">LEER MÁS</h3>
                                            </div>
                                        </div>
                                    ) : ("")}
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                <section id="contacto">
                    <div className="content-contacto">
                        <h2 className="title" style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>DISEÑA TU VIAJE</h2>
                        <form id="formContacto" className="form-contacto">
                            <div className="info">
                                <h4 className="title">
                                    AQUÍ COMIENZA TU EXPERIENCIA
                                </h4>
                                <p className="description">
                                    Una vez llenado este formulario, uno de nuestros planners travelers se pondra en
                                    contacto contigo para perfeccionar ese viaje que tanto has soñado. Estamos aquí para
                                    brindarte la mejor experiencia</p>
                            </div>

                            <div className="content-inputs">
                                <div className="content-type-destino">
                                    <div>
                                        <label className="label" htmlFor="travel">¿CUÁL ES EL DESTINO QUE QUIERES VISITAR?</label>
                                        <select name="travel" id="travel">
                                            <option >Seleccione una opción</option>
                                            {travels?.length > 0 ? (
                                                travels.map((index, value) => {
                                                    return <option key={index.id} value={index.id}>{index.title}</option>
                                                })
                                            ) : ""}

                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor=""> ¿QUÉ OTRO DESTINO TIENES EN MENTE?</label>
                                        <select name="" id=""></select>
                                    </div>
                                </div>
                                <div>
                                    <div className="content-experiencias" id="tags">
                                        <label htmlFor=""> ¿QUÉ EXPERIENCIAS QUIERES VIVIR?</label>
                                        <div>
                                            <input className="hidden" type="text" name="tags" />
                                            {tags?.length > 0 ? (
                                                tags.map((index, value) => {
                                                    return <div key={index.id} data-id={index.id} className="item-experiencia">{index.name}</div>
                                                })
                                            ) : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="cuando-viajar">
                                    <div className="desicion">
                                        <label htmlFor=""> ¿SABES CUÁNDO VIAJAR?</label>
                                        <div>
                                            <input type="radio" name="viajar" id="" />
                                            <label htmlFor="">Sí</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="viajar" id="" />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <div className="time">
                                        <div id="date_start">
                                            <label htmlFor="date_start">IDA:</label>
                                            <input type="date" name="date_start" id="" />
                                        </div>
                                        <div id="date_end">
                                            <label htmlFor="date_end">REGRESO:</label>
                                            <input type="date" name="date_end" id="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="personas">
                                    <div>
                                        <div id="number_children">
                                            <label htmlFor="number_children">NIÑOS</label>
                                            <select name="number_children" id="">
                                                <option >Seleccione una opción</option>

                                                {
                                                    (() => {
                                                        const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                                                        return Array.map((index, value) => {
                                                            return <option key={index} value={index} className="item-experiencia">{index}</option>
                                                        })
                                                    })()
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <div id="number_adults">
                                            <label htmlFor="number_adults">ADULTOS</label>
                                            <select name="number_adults" id="">
                                                <option >Seleccione una opción</option>

                                                {
                                                    (() => {
                                                        const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                                                        return Array.map((index, value) => {
                                                            return <option key={index} value={index} className="item-experiencia">{index}</option>
                                                        })
                                                    })()
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="viaje-ideal">
                                    <label htmlFor="description">TU VIAJE IDEAL...</label>
                                    <textarea name="description" id="description"></textarea>
                                </div>
                            </div>
                            <div className="footer">
                                <button style={{ background: (company != null ?? company.secundary_color ? company.secundary_color : "") }} type="submit">ENVIAR</button>
                            </div>
                        </form>
                    </div>
                    <img className="img-logo-whatssapp" src={logo_whatssapp} alt="" />
                </section>
            </div>
            <div id="footer">
                <div className="alianzas">
                    <h2 className="title" style={{ color: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>ALIANZAS ESTRATÉGICAS</h2>
                    <marquee behavior="scroll" direction="left" className="img-alianzas">
                        <div className="img-alianzas">

                            {alianzas?.length > 0 ? (
                                alianzas.map((value, index) => {

                                    if (value.logo) {
                                        return <div key={index}>
                                            <img src={base_api_url + "" + value.logo} alt={`Instagram post ${index + 1}`} />
                                        </div>
                                    }
                                })
                            ) : ("")}
                        </div>
                    </marquee>
                </div>
                <div className="suscribete">
                    <form action="" id="formSuscribirme">
                        <div>
                            <div className="form-suscribete">
                                <h2 className="title">Suscríbete a nuestro newsletter y recibe noticias, descuentos y más</h2>
                                <input name="email" id="email" type="text" placeholder="Correo electrónico" />
                            </div>
                            <button type="submit" style={{ background: (company != null ?? company.secundary_color ? company.secundary_color : "") }}>SUSCRIBIRME</button>
                        </div>
                    </form>
                </div>
                <div className="info-footer">
                    <div className="content-items">
                        <div className="content-imgs">
                            <div className="">
                                <img src={company != null ?? company.logo ? (base_api_url + company.logo) : imgLogo} alt="" />
                            </div>
                            <div className="">
                                <img src={imgLogosRedes} alt="" />
                            </div>
                        </div>
                        <div className="content-text">
                            <h4>Inicio</h4>
                            <h4>¿Quienes somos?</h4>
                            <h4>Viajes grupales</h4>
                            <h4>Viajes a la medida</h4>
                            <h4>Contáctanos</h4>
                            <h4>Alianzas estratégicas</h4>
                            <h4>Blogs</h4>
                            <h4>Términos y condiciones</h4>
                            <h4>Política de privacidad</h4>
                            <h4>Registro Nacional de Turismo</h4>
                        </div>
                        <div className="content-text">
                            <div>
                                <img src={icono_mail} alt="" />
                                <h4>info@allintravels.com</h4>
                            </div>
                            <div>
                                <img src={icono_telefono} alt="" />
                                <h4>0057 (604) 444 45 83</h4>
                            </div>
                            <div>
                                <img src={icono_ubicacion} alt="" />
                                <h4>Carrera 43A  # 18 Sur - 135 Of 834,
                                    Sao Paulo Plaza Medellín - Colombia.</h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}


export default Home;