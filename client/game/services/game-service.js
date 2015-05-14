angular
    .module('engine.game-service', [
        'game.world-root',
        'game.systems',
        'engine.input.input-system',
        // shared systems
        'systems.armor',
        'systems.mesh',
        'systems.inventory'
    ])
    .service('GameService', [
        '$injector',
        '$rootWorld',
        '$log',
        function($injector, $rootWorld, $log) {
            'use strict';

            var _defaultSystems = [ // order matters
                'NameMesh',
                'Mesh',
                'RigidBody',
                'Quad',
                'Octree',
                'CollisionReporter',
                'Network',
                'Inventory',
                'Appearance',
                'Armor',
                'Input',
                'Sound',
                'Script',
                'ProcTree',
                'Sprite',
                'Light',
                'Helper',
                'WieldItem',
                'Shadow',
                'Particle',
                'Trigger',
                'Camera'
            ];

            this.start = function() {
                // ALL these systems have to load before other entities
                // they don't load stuff after the fact...
                // TODO: fix that
                $log.debug('Adding game systems...');
                angular.forEach(_defaultSystems, function(system) {
                    var registeredSystemName = system + 'System';
                    if ($injector.has(registeredSystemName)) {
                        var Sys = $injector.get(registeredSystemName);
                        $rootWorld.addSystem(new Sys(), angular.lowercase(system));
                    } else {
                        $log.debug(registeredSystemName + ' was not found!');
                    }
                });
            };
        }
    ]);
