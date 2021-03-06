'use strict'

const html = require('pithy')
const beautify = require('js-beautify').html
const helpers = require('../helpers')

const head = (api) => {
	const elements = [
		...helpers.staticHeader(api),
		html.title(null, 'Rechtliches | ' + api.settings.title),
		...helpers.opengraph({ api, extraTitle: null }),
		html.link({ rel: 'stylesheet', type: 'text/css', href: '/assets/styles/impressum.css' })
	]
	return html.head(null, elements)
}

const generate = (api) => {
	let document = '<!doctype html>' + html.html(null, [
		head(api),
		html.body(null, [
			html.div('#page', [
				html.div('#header', [html.a({ href: './start', title: 'Preiskalender' }, [html.h1(null, 'Preiskalender')])]),
				html.h2(null, 'Impressum & Datenschutz'),
				html.div({ class: 'section' }, [
					html.p(null, [
						html.a({ href: 'https://juliustens.eu' }, 'Julius Tens'),
						', ',
						html.a({ href: 'mailto:bahnguru@juliustens.eu' }, 'bahnguru@juliustens.eu'),
						', Schlickweg 10, 14129 Berlin.'
					])
				]),
				html.div({ class: 'section' }, [
					html.p(null, [
						'Dieses Projekt ist ',
						html.a({ href: 'https://github.com/juliuste/bahn.guru/blob/master/license' }, 'ISC-lizenziert'),
						'. Der Quellcode ist auf ',
						html.a({ href: 'https://github.com/juliuste/bahn.guru' }, 'GitHub'),
						' verfügbar.'
					])
				]),
				html.div({ class: 'section' }, [
					html.p(null, 'Alle Preisangaben unverbindlich und ohne Gewähr.')
				]),
				html.div({ class: 'section' }, [
					html.p(null, 'Es werden keine personenbezogenen Daten gespeichert. Für Verbindungsanfragen werden Start- und Zielpunkt, sowie gewählte Optionen (Reisedauer, Anzahl der Umstiege, etc.), anonymisiert an das Verkehrsunternehmen geschickt. Ansonsten erfolgt keine Weitergabe von Daten an Dritte.')
				])
			]),
			html.div('#footer', [
				html.a({ id: 'faq', href: './faq' }, 'FAQ'),
				html.span(null, ' – '),
				html.a({ id: 'impressum', href: './impressum' }, 'Rechtliches')
			])
		])
	])
	return beautify(document)
}

const createImpressumRoute = (api) => (req, res, next) => {
	res.send(generate(api))
}

module.exports = createImpressumRoute
