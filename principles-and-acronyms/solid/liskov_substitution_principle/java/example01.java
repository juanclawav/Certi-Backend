class Pokeball {
    private double escapeProbability;
    private String name;

    public Pokeball(String name, double escapeProbability) {
        this.name = name;
        this.escapeProbability = escapeProbability;
    }

    public boolean catchPokemon(Pokemon pokemon) {
        if (pokemon.getEscapeProbability() < escapeProbability) {
            System.out.println(pokemon.getName() + " fue atrapado con una " + name + "!");
            return true;
        } else {
            System.out.println(pokemon.getName() + " escapó de la " + name + ".");
            return false;
        }
    }
}

class GreatBall extends Pokeball {
    public GreatBall() {
        super("GreatBall", 0.5);
    }
}

class UltraBall extends Pokeball {
    public UltraBall() {
        super("UltraBall", 0.2);
    }
}}

