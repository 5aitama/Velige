
/**
 * Represent an entity.
 */
export type Entity = number;

export class Component {}

export class TestComponentA extends Component {}
export class TestComponentB extends Component {}

export default class World {
    /** The list of all available entities. */
    private _available_entities: Entity[];

    /** The list of all living entities. */
    private _living_entities: Entity[];

    /** All entities components. */
    private _components: { [type: string]: {[e: number]: Component} } = {};

    /**
     * Create new instance of `World`.
     * @param max_entities The maximum amount of entities in the world.
     */
    constructor(max_entities: number) {
        this._available_entities = new Array(max_entities);
        this._living_entities = new Array(max_entities);

        for(let i = 0; i < this._available_entities.length; i++) {
            this._available_entities[i] = i;
        }
    }

    /**
     * Create new `Entity`.
     * @returns The new entity
     */
    public createEntity() : Entity {
        if(this._available_entities.length === 0)
            throw new Error("Maximum entities amount is reached!");

        const entity = this._available_entities.pop()!;
        this._living_entities.push(entity);

        return entity;
    }

    /**
     * Destroy an `Entity`
     * @param entity The entity to destroy
     * @returns 
     */
    public destroyEntity(entity: Entity) {
        const id = this._living_entities.indexOf(entity);

        if(id === -1)
            return;
        
        this._available_entities.push(this._living_entities.splice(id, 1)[0]);
    }

    /**
     * Add a component to an `Entity`.
     * @param entity The entity.
     * @param component The component to add,
     */
    public addComponent<C extends Component>(entity: Entity, component: C) {
        if(!this._components[component.constructor.name]) {
            this._components[component.constructor.name] = {};
        }

        this._components[component.constructor.name][entity] = component;
    }

    /**
     * Remove a component on `Entity`.
     * @param entity The entity.
     * @param component The component type to remove.
     */
    public removeComponent<C extends Component>(entity: Entity, component: new () => C) {
        delete this._components[component.name][entity];
    }

    /**
     * Search all entities that have a specific component(s).
     * @param components The component(s) to find
     * @returns All entities that have the given component(s).
     */
    public entityWithAll<C extends Component>(components: (new () => C)[]) {
        // let entities: Entity[] = [];

        // for(const k in this._components) {
        //     const _entities = [];
        //     for(let i = 0; i < components.length; i++){
        //         if(this._components[components[i].name]) {
        //             _entities.push(...Object.keys(this._components[components[i].name])
        //                 .map(key => parseInt(key)));
        //         }
        //     }
        // }

        // return entities;
    }
}