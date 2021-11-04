/**
 * Using auto-layout method to get position results and update the diagram
 */
var updateLayout = function () {
    const [width, height] = [istar.paper.getArea().width, istar.paper.getArea().height]
    const { current, nodes, links } = layout()

    // straighten-links
    _.forEach(istar.getLinks(), function (link) {
        link.vertices([]);
    });

    // Get the origin point position, rather than center position
    const findX = function (item, leftMost = 0) {
        return item.x - item.width * 0.5 - leftMost
    }
    const findY = function (item, topMost = 0) {
        return item.y - item.height * 0.5 - topMost
    }

    // Bleeding Area
    let leftMost = (nodes.length !== 0) ? nodes[0].x : 0
    let topMost = (nodes.length !== 0) ? nodes[0].y : 0

    _.forEach(nodes, function (item) {
        if (findX(item, leftMost) < 0)
            leftMost = findX(item)
        if (findY(item, topMost) < 0)
            topMost = findY(item)
    })
    // radius bleed
    leftMost = leftMost - 50
    topMost = topMost - 50

    // Update the position
    _.forEach(nodes, function (item) {
        let elem = _.find(istar.getElements(), {id: item.id})

        if (elem) {
            // Get the position delta
            let dx = findX(item, leftMost) - elem.position().x,
                dy = findY(item, topMost) - elem.position().y
            elem.position(findX(item, leftMost), findY(item, topMost))
            elem.set('originalPosition', elem.get('position'))
            // Apply the delta to its children
            if (elem.isKindOfActor()) {
                _.forEach( _.filter(elem.getEmbeddedCells(),
                    item => item.isElement() ),child => {
                    let cx = child.position().x,
                        cy = child.position().y
                    // let s = dictionary.nodeSize[dictionary.nodeName[child.get("type")]]
                    // child.position(cx + dx - s[0] * 0.5, cy + dy - s[1] * 0.5)
                    child.position(cx + dx, cy + dy)
                })
                elem.updateBoundary()
            }
        }
    })

    // Fit contents to the paper
    istar.paper.fitToContent(null, null, null,
        { minWidth : width, minHeight : height })

    // Original rAF animation implementation
    // const generator = layout(null, {mode: 'generator'})()
    // let result = generator.next()
    // let updateAnimation = function (timestamp) {
    //     const { current, nodes, links } = result.value
    //     let leftMost = 0, topMost = 0
    //     // bleed when finish
    //     if (result.done) {
    //         leftMost = (nodes.length !== 0) ? nodes[0].x : 0
    //         topMost = (nodes.length !== 0) ? nodes[0].y : 0
    //         _.forEach(nodes, function (item) {
    //             if (findX(item, leftMost) < 0)
    //                 leftMost = findX(item)
    //             if (findY(item, topMost) < 0)
    //                 topMost = findY(item)
    //         })
    //         // radius bleed
    //         leftMost = leftMost - 50
    //         topMost = topMost - 50
    //
    //         window.cancelAnimationFrame(updateAnimation)
    //         istar.paper.fitToContent(null, null, null,
    //             { minWidth : width, minHeight : height })
    //     } else {
    //         _.forEach(nodes, function (item) {
    //             let elem = _.find(istar.getElements(), {id: item.id})
    //
    //             if (elem) {
    //                 let dx = findX(item, leftMost) - elem.position().x,
    //                     dy = findY(item, topMost) - elem.position().y
    //                 elem.position(findX(item, leftMost), findY(item, topMost))
    //                 elem.set('originalPosition', elem.get('position'))
    //                 if (elem.isKindOfActor()) {
    //                     _.forEach( _.filter(elem.getEmbeddedCells(),
    //                         item => item.isElement() ),child => {
    //                         let cx = child.position().x,
    //                             cy = child.position().y
    //                         // let s = dictionary.nodeSize[dictionary.nodeName[child.get("type")]]
    //                         // child.position(cx + dx - s[0] * 0.5, cy + dy - s[1] * 0.5)
    //                         child.position(cx + dx, cy + dy)
    //                     })
    //                     elem.updateBoundary()
    //                 }
    //             }
    //         })
    //         window.requestAnimationFrame(updateAnimation)
    //     }
    // }
    // window.requestAnimationFrame(updateAnimation)
}

/**
 * Main entrypoint for layout handling
 * @param data {object | null} - a piStar-format JSON
 * @param options {object | null} - the options collection
 *
 * @param options.mode {string} - layout return data format, usually 'generator', 'array', 'first' or 'last'
 * @param options.tickPerEpoch {number} - ticks per iteration epoch
 * @param options.assureEpoch {number} - assure at least iterate epochs
 * @param options.stopWhenStable {boolean} - do not stop until stable (alpha value under a threshold)
 *
 * @return { (function(): Generator<{current: number, nodes: [], links: []}, void, *>) |
 *          {current: number, nodes: [], links: []} | {current: number, nodes: [], links: []}[] }
 */
const layout = function (data = null, options = null) {
    const mode = options?.mode ?? 'last'
    const tick = options?.tickPerEpoch ?? 50
    const epoch = options?.assureEpoch ?? 20
    const stable = options?.stopWhenStable ?? true

    const jsonData = convert(data)

    const { simulation, nodes, links } = force(_.cloneDeep(jsonData.graph.node), _.cloneDeep(jsonData.graph.link))

    let current = 0

    /**
     * Simulate an epoch
     * @param tick {number} - ticks per iteration epoch
     */
    function simulationEpoch (tick) {
        for (let i = 0; i < tick; i++) {
            simulation.tick()
        }
    }

    /**
     * Check if the iteration keep going
     * @param current {number} - current iteration epoch
     * @param atLeastEpoch {number} - assure at least iterate epochs
     * @param needStable {boolean} - do not stop until stable (alpha value under a threshold)
     * @param simulation {object} - d3-force simulation object
     * @return {boolean} - keep iterate
     */
    function keep (current, atLeastEpoch, needStable, simulation) {
        return ((current < atLeastEpoch) || (needStable && simulation.alpha() >= 0.001))
    }

    /**
     * A Generator factory for output
     * @return { Generator<{current: number, nodes: [], links: []}, void, *> }
     */
    function * generator () {
        while (keep(current, epoch, stable, simulation)) {
            simulationEpoch(tick)
            current += 1
            yield { current, nodes, links }
        }
    }

    /**
     * Gather the position data for output
     * @param mode {string} - 'array', 'first' or 'last'
     * @return { {current: number, nodes: [], links: []} | [] }
     */
    function generalOutput (mode) {
        if (mode === 'first') {
            return { current: 0, nodes, links }
        }
        const results = []
        while (keep(current, epoch, stable, simulation)) {
            simulationEpoch(tick)
            current += 1
            if (mode === 'array') {
                results.push(_.cloneDeep({ current, nodes, links }))
            }
        }
        if (mode === 'array') {
            return results
        } else if (mode === 'last') {
            return _.cloneDeep({ current, nodes, links })
        }
    }

    if (mode === 'generator') {
        return generator
    } else if (mode === 'array' || mode === 'last' || mode === 'first') {
        return generalOutput(mode)
    } else {
        throw Error('Illegal result format ' + mode)
    }
}

/**
 * Use d3-force to implement the force layout algorithm
 * @param nodes {[object]} - an object with ordered node list
 * @param links {[object]} - an object with ordered link list
 * @param radius {number} - force value, 50 by default
 * @return { {simulation: object, nodes: [], links: []} }
 */
const force = function (nodes, links, radius = 50) {
    const [width, height] = [istar.paper.getArea().width, istar.paper.getArea().height]
    // const radius = options?.commonRadius ?? 50

    // function boxingForce () {
    //   for (const d of nodes) {
    //     // Of the positions exceed the box, set them to the boundary position.
    //     // You may want to include your nodes width to not overlap with the box.
    //     d.x = Math.max(d.r + radius, d.x)
    //     d.x = Math.min(width - d.r, d.x)
    //     d.y = Math.max(d.r + radius, d.y)
    //     d.y = Math.min(height - d.r, d.y)
    //   }
    // }

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(l => (l.source.r + l.target.r)))
        .force('charge', d3.forceManyBody()
            .distanceMin(radius * 2)
            .distanceMax(radius * 10)
            .strength(-radius * 20))
        // .force('charge', d3.forceManyBody()
        //   .distanceMin(d => d.r)
        //   .distanceMax(d => d.r * 5)
        //   .strength(d => Math.sqrt(d.r) * -1))
        // .force('radius', d3.forceCollide(radius * 1.25))
        .force('radius', d3.forceCollide()
            .radius(d => d.r * 1.2))
        .force('center', d3.forceCenter(width / 2, height / 2))
        // .force('bounds', boxingForce)
        .stop()

    return { simulation, nodes, links }
}

const dictionary = {
    nodeName: {
        'istar.Actor': 'actor',
        'istar.Agent': 'agent',
        'istar.Resource': 'resource',
        'istar.Quality': 'softgoal',
        'istar.Role': 'role',
        'istar.Task': 'task',
        'istar.Goal': 'goal'
    },
    nodeSize: {
        // from shape.js
        actor: [80, 80],
        agent: [80, 80],
        role: [80, 80],
        goal: [90, 35],
        resource: [90, 35],
        task: [95, 36],
        softgoal: [90, 55]
    },
    linkName: {
        'istar.IsALink': 'ISA',
        'istar.ParticipatesInLink': 'P',
        'istar.DependencyLink': 'd',
        'istar.AndRefinementLink': 'and-d',
        'istar.OrRefinementLink': 'or-d',
        'istar.ContributionLink': 'contribution'
    }
}

/**
 * Convert different format JSON into ordered nodes and links list.
 * @param data {object} - a piStar-format or d3-format JSON, depending on the value of options.mode
 * @returns { {width, graph: {node: [object], link: [object]}, height} }
 */
const convert = function (data) {
    data = _.cloneDeep(data ? data : JSON.parse(istar.fileManager.saveModel()))
    const graph = { node: [], link: [] }

    /**
     * Push the content into container when valid
     * @param container
     * @param content
     */
    function insert (container, content) {
        if (content) {
            container.push(content)
        }
    }

    /**
     * Handle various element based on its type
     * @param obj {Object} - the source element item
     * @param type {String} - element type, usually 'link' or 'node'
     * @return { {r: number, name: string, x: number, y: number,
     *           id: string, type: string, width: number, height: number} |
     *         {name: string, id: string, type: string, source: string, target: string} |
     *         null }
     */
    function assign (obj, type) {
        if (type === 'link') {
            const id = obj.id
            const sid = reverse[obj.source]
            const tid = reverse[obj.target]

            if (!sid || !tid) { throw Error('Cannot find source or target about ' + obj.id) }
            if (sid === tid) { return null }

            let name = ''
            let desc = dictionary.linkName[obj.type]
            if (desc === undefined) { throw Error('Illegal link name ' + obj.type + ' of ' + obj.id) }

            // According to https://www.cin.ufpe.br/~if716/arquivos20161/Overview-iStar-20-Language-Guide.pdf
            if (desc === 'P') {
                desc = 'contribution'
                const sty = _.find(graph.node, { id: sid }).type
                const tty = _.find(graph.node, { id: tid }).type
                if (sty === tty) { name = 'Is part of' } else { name = 'Plays' }
            }
            return { id: id, type: desc, name: name, source: sid, target: tid }
        } else if (type === 'node') {
            const desc = dictionary.nodeName[obj.type]
            if (desc === undefined) { throw Error('Illegal node name ' + obj.type + ' of ' + obj.id) }
            const id = obj.id
            const name = obj.text
            const x = obj.x
            const y = obj.y

            const size = _.find( istar.graph.getElements(), { id: id } ).get("size")
            if (!size)
                throw Error('Illegal node size ' + obj.id)
            const [width, height] = [size.width, size.height]

            reverse[id] = id
            if (obj.nodes) {
                _.forEach(obj.nodes, item => (reverse[item.id] = id))
            }

            const r = (height > width ? height : width) / 2

            return {
                id: id,
                name: name,
                type: desc,
                x: x,
                y: y,
                r: r,
                width: width,
                height: height
            }
        } else {
            throw Error('Unexpected assign procedure ' + type)
        }
    }

    const reverse = {}
    const width = data.diagram.width
    const height = data.diagram.height

    for (const d in data.dependencies) { insert(graph.node, assign(data.dependencies[d], 'node')) }
    for (const a in data.actors) { insert(graph.node, assign(data.actors[a], 'node')) }
    for (const o in data.orphans) { insert(graph.node, assign(data.orphans[o], 'node')) }
    for (const l in data.links) { insert(graph.link, assign(data.links[l], 'link')) }

    return { graph: graph, width: width, height: height }
}