var show_color_names = false
var cm_to_pixels = 3
var seam = 2
var summary = []
var colors = [
	{
		"color": "#FFFFFF",
		"name": "белый",
		"chance": 0.1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#060105",
		"name": "чёрный",
		"chance": 0.1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#B6B8BB",
		"name": "стальной",
		"chance": 0.1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#8080.185",
		"name": "графит",
		"chance": 0.1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#565F69",
		"name": "тёмно-серый",
		"chance": 0.1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#D0D2D5",
		"name": "пепельный",
		"chance": 0.1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#D8E3E9",
		"name": "серый",
		"chance": 0.1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#AAD4D6",
		"name": "бирюза",
		"chance": 5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#ADDAEE",
		"name": "голубой",
		"chance": 5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#6ABEE2",
		"name": "лазурный",
		"chance": 5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#F3E8DE",
		"name": "серо-бежевый",
		"chance": 0.5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#F2E3D0",
		"name": "песок",
		"chance": 0.5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#E1D6BE",
		"name": "хаки светлый",
		"chance": 0.5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#FDDFE1",
		"name": "светло-розовый",
		"chance": 1.5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#E7A6A6",
		"name": "розовый",
		"chance": 4,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#D87374",
		"name": "темно-розовый",
		"chance": 4,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#FDECCB",
		"name": "желтый",
		"chance": 4,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#F2C5AB",
		"name": "персиковый",
		"chance": 2,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#8D161F",
		"name": "бордо",
		"chance": 4,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#FB894D",
		"name": "оранжевый",
		"chance": 4,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#FC8952",
		"name": "рыжий",
		"chance": 3,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#FCED51",
		"name": "ярко-жёлтый",
		"chance": 5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#A9D591",
		"name": "зелёный",
		"chance": 5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#CEDB9A",
		"name": "салатный",
		"chance": 5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#F33F46",
		"name": "красный",
		"chance": 5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#916B8B",
		"name": "фиолетовый",
		"chance": 0.5,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#2D3076",
		"name": "синий",
		"chance": 1,
		"normal_chance_top_limit": 0
	},
	{
		"color": "#7D2C0C",
		"name": "коричневый",
		"chance": 1,
		"normal_chance_top_limit": 0
	}
]
var history = []

function update_chance(name, val) {
	for (var i = 0; i < colors.length; i++) {
		if(name == colors[i].name) {
			colors[i].chance = parseFloat(val)
		}
	}
}

function render_colorpicker() {
	html = '';
	for (var i = 0; i < colors.length; i++) {
		html += '<li><div style="background: ' + colors[i].color + '">'
		if(show_color_names) {
			html += colors[i].name
		} else {
			html += '&nbsp;'
		}
		html += '</div></li>'
	}
	html += '<li><div style="background: #FFF">+</div></li>'
	$("#main_colorpicker > ul").html(html)
}

function render_distribution_picker() {
	html = '';
	for (var i = 0; i < colors.length; i++) {
		html += '<li><div style="background: ' + colors[i].color + '">'
		if(show_color_names) {
			html += colors[i].name
		} else {
			html += '&nbsp;'
		}
		html += '</div><input type="range" name="' + colors[i].name + '" value="' + colors[i].chance + '" min="0" max="5" step="0.1"></input><input type="number" value="' + colors[i].chance + '" min="0" max="5" step="0.1"></input></li>'
	}
	$("#distribution_picker > ul").html(html)
}

function normalize_chances() {
	var chances_sum = 0
	for (var i = 0; i < colors.length; i++) {
		chances_sum += colors[i].chance
	}
	var normal_chances_sum = 0
	for (var i = 0; i < colors.length; i++) {
		normal_chances_sum += colors[i].chance / chances_sum
		colors[i].normal_chance_top_limit = normal_chances_sum
	}
}

function get_color() {
	var random_number = Math.random()
	for (var i = colors.length - 2; i >= 0; i--) {
		if(random_number > colors[i].normal_chance_top_limit) {
			return colors[i+1].color
		}
	}
	return colors[0].color
}

function clear_summary() {
	summary.length = 0
	for (var i = 0; i < colors.length; i++) {
		summary[i] = {
			summary: 0,
			name: colors[i].name,
			color: colors[i].color
		}
	}
}

function add_color(color) {
	for (var i = 0; i < summary.length; i++) {
		console.log(summary[i].color)
		if(summary[i].color == color)
			summary[i].summary += 1
	}
}

function render_summary() {
	html = ""
	for (var i = 0; i < summary.length; i++) {
		html += '<div><div class="tile" style="background: ' + summary[i].color + '; width: ' + tw + 'px; height: ' + th + 'px;"></div>' + summary[i].name + ' — ' + summary[i].summary + '</div>'
	}
	$("#sm").html(html)
}

function make_tiling(){
	normalize_chances()
	clear_summary()

	var wall_width = $(".walls_size > input.width").val()*cm_to_pixels
	var wall_height = $(".walls_size > input.height").val()*cm_to_pixels
	var tile_width = $(".tile_size > input.width").val()*cm_to_pixels
	var tile_height = $(".tile_size > input.height").val()*cm_to_pixels

	var tiles_by_w = ((wall_width-seam) - (wall_width-seam) % (tile_width + seam)) / (tile_width + seam)
	var tiles_by_h = ((wall_height-seam) - (wall_height-seam) % (tile_height + seam)) / (tile_height + seam)

	var last_tile_w = (wall_width-seam) % (tile_width + seam) - seam
	var last_tile_h = (wall_height-seam) % (tile_height + seam) - seam

	var seam_styles = 'margin-left: ' + seam + 'px; margin-top: ' + seam + 'px;'
	var html = '<div class="wall" id="wall_1" style="width: ' + wall_width + 'px; height: ' + wall_height + 'px;">'

	history.push({
		"wall_w": wall_width,
		"wall_h": wall_height,
		"tile_w": tile_width,
		"tile_h": tile_height,
		"seam": seam,
		"colors": []
	})
	push_id = history.length-1
	for (var i = 0; i <= tiles_by_h; i++) {
		th = tile_height
		if (i == tiles_by_h) {
			th = last_tile_h
		}
		for (var j = 0; j <= tiles_by_w; j++) {
			tw = tile_width
			if (j == tiles_by_w) {
				tw = last_tile_w
			}
			if(tw>0 && th>0) {
				color = get_color()
				add_color(color)
				history[push_id].colors.push(color)
				html += '<div class="tile" style="background: ' + color + '; width: ' + tw + 'px; height: ' + th + 'px; ' + seam_styles + '"></div>'
			}
		}
	}
	html += '</div><div id="sm"></div>'
	$(".workspace").html(html)
	render_summary()
}




$(document).ready(function (){



render_colorpicker();
render_distribution_picker();

$("body").on("input", ".distribution input[type=range]", function() {
	$(this).siblings("input[type=number]").first().val($(this).val())
	update_chance($(this).attr("name"), $(this).val())
	make_tiling()
}).on("input", ".distribution input[type=number]", function() {
	$(this).siblings("input[type=range]").first().val($(this).val())
	update_chance($(this).siblings("input[type=range]").first().attr("name"), $(this).val())
	make_tiling()
}).on("input", function () {
	make_tiling()
})


$("#generate").on("click", function () { make_tiling() })

make_tiling()

})