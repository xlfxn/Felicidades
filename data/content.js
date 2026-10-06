/* ============================================================
   CONTENIDO GENERAL
   ============================================================ */

const birthdayContent = {

    /* ========================================================
       PERSONAJES
       ======================================================== */

    characters: {

        chiikawa: {
            name: "Chiikawa",
            icon: "🌱",
            description:
                "Te hemos preparado unas dedicatorias con Chiikawa."
        },

        hachiware: {
            name: "Hachiware",
            icon: "💙",
            description:
                "Aquí se esconden algunos de nuestros recuerdos."
        },

        cinnamoroll: {
            name: "Cinnamoroll",
            icon: "☁️",
            description:
                "Hay una pequeña carta esperándote."
        },

        chococat: {
            name: "Chococat",
            icon: "🐱",
            description:
                "Chococat ha encontrado algo extraño. Parece que hay varias pistas escondidas por su rincón."
        },

        usagi: {
            name: "Usagi",
            icon: "🐰",
            description:
                "Prepárate para algo un poquito más caótico."
        },

        pompompurin: {
            name: "Pompompurin",
            icon: "🍮",
            description:
                "Parece que alguien ha dejado unos regalos por aquí."
        },

        momonga: {
            name: "Momonga",
            icon: "😈",
            description:
                "No estoy muy seguro de que debas confiar en él..."
        }

    },


    /* ========================================================
       CHIIKAWA
       ======================================================== */

    chiikawa: {

        discoveries: [

            {
                type: "text",
                title: "Primera dedicatoria ✨",
                content:
                    "Sé que no te gusta tu cumpleaños, pero quería hacer algo bonito pensando en ti."
            },

            {
                type: "text",
                title: "Segunda dedicatoria 💕",
                content:
                    "Adoro dormirme a tu lado, me hace sentir seguro y cómodo."
            },

            {
                type: "text",
                title: "Última dedicatoria ⭐",
                content:
                    "Me haces feliz con pequeñas cosas, espero ser capaz de hacer lo mismo por ti todos los días."
            }

        ]

    },


    /* ========================================================
       HACHIWARE
       ======================================================== */

    hachiware: {

        memories: [

            {
                image:
                    "assets/photos/hachiware/recuerdo01.jpg",

                fallback:
                    "📸",

                title:
                    "Una de nuestras primeras fotos",

                text:
                    "Aún recuerdo la primera vez en baños, fue muy divertido pasarlo ahí."
            },

            {
                image:
                    "assets/photos/hachiware/recuerdo02.jpg",

                fallback:
                    "💙",

                title:
                    "Esta tiene algo especial",

                text:
                    "Era nuestra primera foto medio romanticona, a mi me encanta, espero que te guste también."
            },

            {
                image:
                    "assets/photos/hachiware/recuerdo03.jpg",

                fallback:
                    "✨",

                title:
                    "Sin duda, de mis favoritas",

                text:
                    "Nada mejor que estar tranquilos en la cama haciendo fotos, solo porque me agarró locura y dije, hagamos fotos."
            },

            {
                image:
                    "assets/photos/hachiware/recuerdo04.jpg",

                fallback:
                    "💕",

                title:
                    "Esta me parece muy natural",

                text:
                    "Nada más natural que tú mordiéndome y disfrutándolo mientras yo solo acepto mi destino."
            }

        ]

    },


    /* ========================================================
       CINNAMOROLL
       ======================================================== */

    cinnamoroll: {

        pages: [

            {
                title:
                    "Esto es para ti 💙",

                text:
                    "He diseñado todo esto intentando pensar en lo que más te gusta y he tratado realmente de hacer que sea una experiencia lo más disfrutable y entretenida para este ratito que te robo."
            },

            {
                title:
                    "Quería que supieras... ☁️",

                text:
                    "Lo mucho que me importas y lo mucho que disfruto de hacer cosas así por ti, sé que últimamente no he hecho muchas cosas especiales así para ti, pero andaba un poco corto de imaginación y no sabía cómo plasmar lo mucho que me importas en un formato que sea algo característico de mi."
            },

            {
                title:
                    "Y sobre todo... ❤️",

                text:
                    "Espero que este pequeño espacio te recuerde, aunque sea un poquito, lo especial que eres para mí y lo mucho que disfruto que me cuentes de las cosas que te gustan."
            }

        ]

    },


    /* ========================================================
       CHOCOCAT
       ======================================================== */

    chococat: {

        discoveries: [

            {
                title: "Primera pista 🐾",
                text: "Parece que Chococat ha estado siguiendo algo... Hay huellas por todas partes."
            },

            {
                title: "Segunda pista ⭐",
                text: "Has encontrado otra. Parece que lo que estamos buscando es algo familiar."
            },

            {
                title: "La última pista 🔎",
                text: "Tiene 4 patas y mucho pelo... Es momento de ver el secreto."
            }

        ]

    },

    /* ========================================================
   USAGI
   ======================================================== */

    usagi: {

        words: [

            {
                word: "Toto",
                missing: [1, 3]
            },

            {
                word: "Nia",
                missing: [1]
            },

            {
                word: "Cappuccino",
                missing: [1, 4, 7, 9]
            },

            {
                word: "Puyo",
                missing: [1, 3]
            },

            {
                word: "Shisa",
                missing: [2, 4]
            }

        ]

    },


    /* ========================================================
   POMPOMPURIN
   ======================================================== */

    pompompurin: {

        gifts: [

            {
                image:
                    "",

                emoji:
                    "🎁",

                revealImage:
                    "assets/photos/pompompurin/regalo01.jpg",

                revealEmoji:
                    "💙",

                title:
                    "Primer regalo",

                text:
                    "Recuerdo que dijiste que querías tu gatita, no te preocupes que es tuya, a ver si con suerte llega antes de que vaya."
            },


            {
                image:
                    "",

                emoji:
                    "🎁",

                revealImage:
                    "assets/photos/pompompurin/regalo02.jpg",

                revealEmoji:
                    "💙",

                title:
                    "Segundo regalo",

                text:
                    "No sé si sea el mayor de los regalos, pero te llevaré uno así, espero."
            },


            {
                image:
                    "",

                emoji:
                    "🎁",

                revealImage:
                    "assets/photos/pompompurin/regalo03.jpg",

                revealEmoji:
                    "💙",

                title:
                    "Último regalito",

                text:
                    "Tendrás que elegir si uno u otro amor."
            }

        ]

    },
 /* ========================================================
        MOMONGA
        ======================================================== */

        momonga: {

            targetScore:
                5,

            bushCount:
                6,

            reward: {

                playlistEmbed:
                    "https://open.spotify.com/embed/playlist/18yuw3lIWF3V4ALhLWHKmu?si=cffcdff86c634782",

                title:
                    "Quería dejarte esta playlist hecha para expresarme 🎧",

                text:
                    "Hay canciones que, por una razón u otra, terminan haciéndome pensar en ti. Así que quería hacer una pequeña recopilación para ti."

            }

        },


    /* ========================================================
       FINALIZACIÓN DE EXPERIENCIAS
       ======================================================== */

    completion: {

        chiikawa: {

            icon:
                "🌱",

            eyebrow:
                "Primera aventura completada",

            title:
                "Estas son mis pequeñas dedicatorias para ti",

            text:
                "Chiikawa y yo estamos ansiosos porque sigas explorando este mini mundo."

        },


        hachiware: {

            icon:
                "💙",

            eyebrow:
                "Segundo recuerdo completado",

            title:
                "Fin del albúm, de momento.",

            text:
                "Me gustaría guardar todos nuestros recuerdos como fotos. Pero bueno, aquí dejo los que más me han gustado y espero que podamos hacer más y mejores."

        },


        cinnamoroll: {

            icon:
                "☁️",

            eyebrow:
                "Tercera aventura completada",

            title:
                "Final de esta cartita",

            text:
                "Espero que estas palabras se queden contigo un poquito más de lo que has tardado en leerlas."

        },

        chococat: {

            icon:
                "🐱",

            eyebrow:
                "Cuarta aventura completada",

            title:
                "¡Estábamos pensando en Nia!",

            text:
                "Chococat ha intentado esconderlo bien, pero ¿realmente descubriste la palabra?."

        },

        usagi: {

            icon:
                "🐰",

            eyebrow:
                "Juego completado",

            title:
                "Usagi ha caido!",

            text:
                "Has logrado completar esta misión. Usagi tendrá que preparar algo más dificil para la próxima."

        },

        pompompurin: {

            icon:
                "🍮",

            eyebrow:
                "Regalos abiertos",

            title:
                "¡Pompompurin ya no guarda ningún secreto!",

            text:
                "Has abierto todos los regalos que había preparado para ti."

        },

        momonga: {

            icon:
                "😈",

            eyebrow:
                "Momonga atrapado",

            title:
                "La atrapaste!",

            text:
                "Después de estarse escondiendo, nuestra ardilla quimera roba cuerpos ya no puede esconderse más."

        }

    }

};