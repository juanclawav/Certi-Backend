class Pokemon {
    private String name;
    private String type;
    // Constructor, getters y setters
}

interface Attacker {
    void attack();
}

interface Healer {
    void heal();
}

interface Flyer {
    void fly();
}

interface Swimmer {
    void swim();
}

class Pikachu implements Attacker {
    public void attack() {
        System.out.println("Pikachu usa Impactrueno!");
    }
}

class Lapras implements Swimmer, Attacker {
    public void swim() {
        System.out.println("Lapras nada tranquilamente!");
    }

    public void attack() {
        System.out.println("Lapras usa Hidrobomba!");
    }
}

// ********* IMPLEMENTACION HEALER Y FLYER

class Snorlax implements Healer {
    public void heal(){
        System.out.println("Snorlax usa rest!);
    }
}
class Pidgeot implements Flyer {
    public void fly(){
        System.out.println("Pidgeot usa Volar!);
    }
}

class Principal {
	public static void main(String [] args) {
		Lapras lapra = new Lapras();
		lapra.swim();
	}
}