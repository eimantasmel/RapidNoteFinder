<?php

namespace App\Repository;

use App\Entity\Note;
use App\Service\RedisCacheService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;

/**
 * @extends ServiceEntityRepository<Note>
 *
 * @method Note|null find($id, $lockMode = null, $lockVersion = null)
 * @method Note|null findOneBy(array $criteria, array $orderBy = null)
 * @method Note[]    findAll()
 * @method Note[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, private RedisCacheService $cache)
    {
        parent::__construct($registry, Note::class);
    }

    public function addNote(string $description, string $content, string $associate) : Note
    {
        if(empty($description) || empty($content) || empty($associate))
        {
            throw new \Exception('Description, content or associate cannot be empty', Response::HTTP_BAD_REQUEST);
        }
        $note = new Note();
        $note->setDescription($description)
            ->setContent($content)
            ->setAssociate($associate)
            ->setCreatedAt(new \DateTimeImmutable());


        $this->getEntityManager()->persist($note);
        $this->getEntityManager()->flush();

        return $note;
    }

    public function updateNote(Note $note, string $content) : Note
    {
        if(empty($content))
        {
            throw new \Exception('Content cannot be empty', Response::HTTP_BAD_REQUEST);
        }
        $note->setContent($content);
        $this->getEntityManager()->flush();

        return $note;
    }

    public function findNoteByDescription(string $description, string $associate) : ?Note
    {
        $note = $this->cache->getItem($associate, $description);
        if($note)
            return $note;

        $note = $this->createQueryBuilder('n')
            ->where("n.description like :val")
            ->andWhere('n.associate = :val2')
            ->setParameter('val', '%' . $description . '%')
            ->setParameter('val2', $associate )
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();


        $this->cache->addItem($associate, $description, $note);
        return $note;
    }
}
