"use strict";

var body = $("body");
var popup = $(".popup");
popup.on('click', '.btn-close', function () {
  var t = $(this);
  t.parent().parent().fadeOut(function () {
    t.parent().siblings().attr("src", " ");
  }).removeClass('over');
  body.removeClass('hidden');
  return false;
});
var mapMex = $(".wrapper-map");
mapMex.mapael({
  map: {
    name: "mexico",
    zoom: {
      enabled: true,
      maxLevel: 5
    },
    defaultArea: {
      attrs: {
        // fill: "#d6d6d6",
        stroke: "#fff"
      },
      // attrsHover: {
      //   fill: "#d6d6d6"
      // },
      text: {
        attrs: {
          fill: "#fff"
        },
        attrsHover: {// fill: "#484A4B"
        }
      },
      eventHandlers: {
        click: function click(e, id, mapElem, textElem, elemOptions) {
          var attr = elemOptions.attrs["class"];
          var key = elemOptions.key;

          if (attr == 'elecciones') {
            // mapMex.trigger('zoom', {
            //   area: id,
            //   areaMargin: 5,
            //   level: 5
            // });
            popup.find("img").attr("src", "img/graficas-estados/".concat(key, ".png"));
            popup.fadeIn().addClass('over'); // body.addClass('hidden')
          }
        }
      }
    }
  },
  legend: {
    area: {
      title: "Elecciones 2021",
      slices: [{
        max: 1,
        attrs: {
          fill: "#f6b967",
          "stroke-width": 2
        },
        attrsHover: {
          fill: "#f68e01"
        },
        label: "Estados con elecciones"
      }, {
        min: 2,
        attrs: {
          fill: "#d6d6d6"
        },
        attrsHover: {
          fill: "#d6d6d6"
        },
        label: "Estados sin elecciones"
      }]
    }
  },
  // Customize some areas of the map
  areas: {
    "aguascalientes": {
      value: 2,
      tooltip: {
        content: "Aguascalientes"
      },
      key: "ags"
    },
    "baja california": {
      value: 1,
      tooltip: {
        content: "Baja California"
      },
      key: "bcn",
      attrs: {
        "class": 'elecciones'
      }
    },
    "baja california sur": {
      value: 1,
      tooltip: {
        content: "Baja California sur"
      },
      key: "bcs",
      attrs: {
        "class": 'elecciones'
      }
    },
    "campeche": {
      value: 1,
      tooltip: {
        content: "Campeche"
      },
      key: "camp",
      attrs: {
        "class": 'elecciones'
      }
    },
    "ciudad de mexico": {
      value: 2,
      tooltip: {
        content: "CDMX"
      },
      key: "cdmx"
    },
    "chihuahua": {
      value: 1,
      tooltip: {
        content: "Chihuahua"
      },
      key: "chih",
      attrs: {
        "class": 'elecciones'
      }
    },
    "chiapas": {
      value: 2,
      tooltip: {
        content: "Chiapas"
      },
      key: "chis"
    },
    "coahuila": {
      value: 2,
      tooltip: {
        content: "Coahuila"
      },
      key: "coah"
    },
    "colima": {
      value: 1,
      tooltip: {
        content: "Colima"
      },
      key: "col",
      attrs: {
        "class": 'elecciones'
      }
    },
    "durango": {
      value: 2,
      tooltip: {
        content: "Durango"
      },
      key: "dgo"
    },
    "estado de mexico": {
      value: 2,
      tooltip: {
        content: "Estado de México"
      },
      key: "edomex"
    },
    "guerrero": {
      value: 1,
      tooltip: {
        content: "Guerrero"
      },
      key: "gro",
      attrs: {
        "class": 'elecciones'
      }
    },
    "guanajuato": {
      value: 2,
      tooltip: {
        content: "Guanajuato"
      },
      key: "gto"
    },
    "hidalgo": {
      value: 2,
      tooltip: {
        content: "Hidalgo"
      },
      key: "hgo"
    },
    "jalisco": {
      value: 2,
      tooltip: {
        content: "Jalisco"
      },
      key: "jal"
    },
    "michoacan": {
      value: 1,
      tooltip: {
        content: "Michoacán"
      },
      key: "mich",
      attrs: {
        "class": 'elecciones'
      }
    },
    "morelos": {
      value: 2,
      tooltip: {
        content: "Morelos"
      },
      key: "mor"
    },
    "nayarit": {
      value: 1,
      tooltip: {
        content: "Nayarit"
      },
      key: "nay",
      attrs: {
        "class": 'elecciones'
      }
    },
    "nuevo leon": {
      value: 1,
      tooltip: {
        content: "Nuevo león"
      },
      key: "nl",
      attrs: {
        "class": 'elecciones'
      }
    },
    "oaxaca": {
      value: 2,
      tooltip: {
        content: "Oaxaca"
      },
      key: "oax"
    },
    "puebla": {
      value: 2,
      tooltip: {
        content: "Puebla"
      },
      key: "pue"
    },
    "queretaro": {
      value: 1,
      tooltip: {
        content: "Querétaro"
      },
      key: "qro",
      attrs: {
        "class": 'elecciones'
      }
    },
    "quintana roo": {
      value: 2,
      tooltip: {
        content: "Quintana Roo"
      },
      key: "qroo"
    },
    "sinaloa": {
      value: 1,
      tooltip: {
        content: "Sinaloa"
      },
      key: "sin",
      attrs: {
        "class": 'elecciones'
      }
    },
    "san luis potosi": {
      value: 1,
      tooltip: {
        content: "San Luis Potosí"
      },
      key: "slp",
      attrs: {
        "class": 'elecciones'
      }
    },
    "sonora": {
      value: 1,
      tooltip: {
        content: "Sonora"
      },
      key: "son",
      attrs: {
        "class": 'elecciones'
      }
    },
    "tabasco": {
      value: 2,
      tooltip: {
        content: "Tabasco"
      },
      key: "tab"
    },
    "tamaulipas": {
      value: 2,
      tooltip: {
        content: "Tamaulipas"
      },
      key: "tam"
    },
    "tlaxcala": {
      value: 1,
      tooltip: {
        content: "Tlaxcala"
      },
      key: "tlax",
      attrs: {
        "class": 'elecciones'
      }
    },
    "veracruz": {
      value: 2,
      tooltip: {
        content: "Veracruz"
      },
      key: "ver"
    },
    "yucatan": {
      value: 2,
      tooltip: {
        content: "Yucatán"
      },
      key: "yuc"
    },
    "zacatecas": {
      value: 1,
      tooltip: {
        content: "Zacataecas"
      },
      key: "zac",
      attrs: {
        "class": 'elecciones'
      }
    }
  }
});