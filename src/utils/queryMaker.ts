import { Filtro } from "../types/filtro";

const query = async (data: Filtro, pagina: number = 0, soloLogos: boolean = false) => {

    const ofset = pagina * 20

    let sparqlQuery = `
    SELECT ?game ?game_label ?developerLabel 
        (GROUP_CONCAT(DISTINCT ?genre_label; SEPARATOR=" , ") as ?genres) 
        (GROUP_CONCAT(DISTINCT ?platform_label; SEPARATOR=" , ") as ?platforms) 
        (MIN(?publicationDate) as ?firstPublication)
        ?logo
    WHERE {
        ?game wdt:P31 wd:Q7889.

        ${data.desarrolladora ? `?developer rdfs:label "${data.desarrolladora}"@en.` : ``}
        ?game wdt:P123 ?developer .

        ?game rdfs:label ?game_label FILTER (LANG(?game_label) = "en").

        ?game wdt:P136 ?genre.
        ?genre rdfs:label ?genre_label FILTER (LANG(?genre_label) = "en").

        ?game wdt:P400 ?platform .
        ?platform rdfs:label ?platform_label filter (lang(?platform_label) = "en").
       
        OPTIONAL {
            ?game wdt:P577 ?publicationDate .
        }

        ${soloLogos ?
            `?game wdt:P154 ?logo.`
            :
            `OPTIONAL {
                ?game wdt:P154 ?logo.
            }`
        }
        
        ${data.genero ? `FILTER CONTAINS(?genre_label, "${data.genero}")` : ``}
        ${data.nombre ? `FILTER CONTAINS(?game_label, "${data.nombre}")` : ``}
        ${data.plataforma ? `FILTER CONTAINS(?game_label, "${data.plataforma}")` : ``}
        ${data.añoDesde ? `FILTER (?publicationDate >= "${data.añoDesde}"^^xsd:dateTime)` : ``}
        ${data.añoHasta ? `FILTER (?publicationDate <= "${data.añoHasta}"^^xsd:dateTime)` : ``}
        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        
    } GROUP BY ?game ?game_label ?developerLabel ?logo ORDER BY ASC(?game_label) LIMIT 21 ${ofset > 0 ? `OFFSET ${ofset}` : ``}
    `;


    const contentPromise = await fetch(`https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}`,
        { headers: { 'Accept': 'application/sparql-results+json' } })
        .then(body => body.json());

    return contentPromise
}

export default query
