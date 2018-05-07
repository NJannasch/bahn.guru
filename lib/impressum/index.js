'use strict'

const html = require('pithy')
const beautify = require('js-beautify').html
const opengraph = require('../helpers').openGraph
const settings = require('../api').settings

const head = () => {
	const elements = [
		html.meta({charset: 'utf-8'}),
		html.meta({name: 'viewport', content: "width=device-width, initial-scale=1.0"}),
		html.title(null, 'Rechtliches | '+settings.title),
        ...opengraph(),
        html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/styles/reset.css'}),
		html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/styles/base.css'}),
		html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/styles/impressum.css'}),
		html.link({rel: 'stylesheet', type: 'text/css', href: 'assets/styles/'+require('config').api+'.css'})
	]
	return html.head(null, elements)
}

const generate = () => {
	let document = '<!doctype html>' + html.html(null, [
		head(),
		html.body(null, [
			html.div('#page', [
				html.div('#header', [html.a({href: "/", title: settings.mainTitle}, [html.h1(null, settings.mainTitle)])]),
				html.h2(null, settings.legalTitle),
				html.div({class: 'section'}, [
					html.p(null, [
						html.a({href: "https://juliustens.eu"}, "Julius Tens"),
						', ',
						html.a({href: "mailto:bahnguru@juliustens.eu"}, 'bahnguru@juliustens.eu'),
						', Schlickweg 10, 14129 Berlin.'
					])
				]),
				html.div({class: 'section'}, [
					html.p(null, [
						'Dieses Projekt ist ',
						html.a({href: "https://github.com/juliuste/bahn.guru/blob/master/LICENSE"}, "MIT-lizenziert"),
						'. Der Quellcode ist auf ',
						html.a({href: "https://github.com/juliuste/bahn.guru"}, 'GitHub'),
						' verfügbar.'
					])
				]),
				html.div({class: 'section'}, [
					html.p(null, 'Alle Preisangaben unverbindlich und ohne Gewähr.')
				])
			]),
			html.div('#footer', [
				html.a({id: 'faq', href: '/faq'}, settings.faqTitle),
				html.span(null, ' – '),
				html.a({id: 'impressum', href: '/impressum'}, settings.legalTitle)
			])
		])
	])
	return beautify(document)
}

const main = (req, res, next) => {
	res.send(generate())
}

module.exports = main
